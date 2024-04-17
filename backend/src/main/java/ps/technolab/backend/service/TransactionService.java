package ps.technolab.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ps.technolab.backend.dto.ItemInInvoiceDto;
import ps.technolab.backend.dto.StatusMessage;
import ps.technolab.backend.dto.TransactionDto;
import ps.technolab.backend.entity.Invoices;
import ps.technolab.backend.entity.ItemsStores;
import ps.technolab.backend.entity.Stores;
import ps.technolab.backend.entity.Transactions;
import ps.technolab.backend.repository.StoresRepository;
import ps.technolab.backend.repository.TransactionRepository;

import java.util.*;
import java.util.stream.Stream;
@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

//    @Autowired
//    private ItemStoreRepository itemStoreRepository;
//
    @Autowired
    private StoresRepository storeRepository;

//    @Autowired
//    private ItemRepository itemRepository;
//
//    @Autowired
//    private EntityManager entityManager;
//
    @Transactional
    public StatusMessage newTransaction(TransactionDto transactionDto) {
        try{
            validateTransactionDto(transactionDto);
        }
        catch (Exception e){
            return new StatusMessage<>("fail", e.getMessage(), null);
        }
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User userDetails = null;
//        if (authentication != null && authentication.isAuthenticated()) {
//            if(authentication.getPrincipal() instanceof String){
//                return new StatusMessage<>("fail", "you should login", null);
//            }
//            userDetails = (User) authentication.getPrincipal();
//        }
//        if (userDetails == null) {
//            return new StatusMessage<>("fail", "you should login!", null);
//        }

        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int year = calendar.get(Calendar.YEAR) % 100;
        int month = calendar.get(Calendar.MONTH) + 1;
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int milliseconds = calendar.get(Calendar.MILLISECOND);

        String generatedInvoice = "#"+String.format("%03d", milliseconds)+"@"+String.format("%02d", hour)+"-"+String.format("%02d", minutes)+"-"+String.format("%02d", day)+"-"+String.format("%02d", month)+"-"+String.format("%02d", year);

        Transactions transaction = new Transactions();
        transaction.setTransactionNumber(generatedInvoice);
        transaction.setIsTaxIncluded(transactionDto.getIsTaxIncluded());
        transaction.setTotalOriginalPrice(transactionDto.getTotalOriginalPrice());
        transaction.setTotalPaidPrice(transactionDto.getTotalPaidPrice());
        transaction.setNote(transactionDto.getNote());
        transaction.setCustomerName(transactionDto.getCustomerName());
        transaction.setCustomerAddress(transactionDto.getCustomerAddress());
        transaction.setCustomerPhone(transactionDto.getCustomerPhone());
        transaction.setPaymentStatus(transactionDto.getPaymentStatus());
        transaction.setAmountPaid(transactionDto.getAmountPaid());
        transaction.setRemaining(transactionDto.getRemaining());
//        transaction.setCreatedBy(userDetails.getUserNickname());
        transaction.setCreatedBy("shahd");
        transaction.setCreatedAt(date);
        List<Invoices> itemInInvoices = new ArrayList<>();

//        List<ItemsStores> itemStores = itemStoreRepository.findByItemIdIn(transactionDto.getItemsInInvoiceDtoList().stream().map(ItemInInvoiceDto::getItemId).toList());
        List<Stores> stores = storeRepository.findAll();

        List<ItemsStores> itemStoreListToUpdate = new ArrayList<>();
        for (ItemInInvoiceDto itemInInvoiceDto : transactionDto.getItemsInInvoiceDtoList()) {
            Invoices itemInInvoice = new Invoices();
            itemInInvoice.setItemId(itemInInvoiceDto.getItemId());
            itemInInvoice.setItemName(itemInInvoiceDto.getItemName());
            Stream<Stores> storeStream = stores.stream().filter(store -> store.getName().equals(itemInInvoiceDto.getStoreName()));
            Optional<Stores> storeOptional = storeStream.findFirst();
            if(storeOptional.isEmpty()){
                return new StatusMessage("fail", "wrong store name: " + itemInInvoiceDto.getStoreName() + " !", null);
            }
            Long storeId = storeOptional.get().getId();
//            Optional<ItemsStores> itemStore = itemStores.stream().filter(itemStore1 -> itemStore1.getItem().equals(itemInInvoiceDto.getItemId())).filter(itemStore1 -> itemStore1.getStore().equals(storeId)).findFirst();
//            if(itemStore.isEmpty()){
//                return new StatusMessage("fail", "itemStore is empty, storeId: " + storeId + " itemId: " + itemInInvoiceDto.getItemId() , null);
//            }
//            if(itemInInvoiceDto.getQuantity() > itemStore.get().getQty()){
//                return new StatusMessage("fail", "total qty in: " + itemInInvoiceDto.getStoreName() + "is less than the order qty!!", null);
//            }
//            itemStore.get().setQty(itemStore.get().getQty() - itemInInvoiceDto.getQuantity());
//            itemStoreListToUpdate.add(itemStore.get());
            itemInInvoice.setQuantity(itemInInvoiceDto.getQuantity());
            itemInInvoice.setStoreName(itemInInvoiceDto.getStoreName());
            itemInInvoice.setPrice0(itemInInvoiceDto.getPrice0());
                itemInInvoice.setPrice1(itemInInvoiceDto.getPrice1());
                itemInInvoice.setPrice2(itemInInvoiceDto.getPrice2());
                itemInInvoice.setPrice3(itemInInvoiceDto.getPrice3());
            itemInInvoice.setTopPrice(itemInInvoiceDto.getTopPrice());
            itemInInvoice.setDiscountPrice(itemInInvoiceDto.getDiscountPrice());
            itemInInvoice.setPaidPrice(itemInInvoiceDto.getPaidPrice());
            itemInInvoices.add(itemInInvoice);
        }

        transaction.setItemsInInvoice(itemInInvoices);
//        itemStoreRepository.saveAll(itemStoreListToUpdate);
        transactionRepository.save(transaction);

        return new StatusMessage("success", "transaction saved to db!", null);
    }


    private void validateTransactionDto(TransactionDto transactionDto) throws Exception {
        if(!transactionDto.getPaymentStatus().equals("OnCash")
                && !transactionDto.getPaymentStatus().equals("OnDelivery")
                && !transactionDto.getPaymentStatus().equals("Debit")
                && !transactionDto.getPaymentStatus().equals("PendingOrder")
                && !transactionDto.getPaymentStatus().equals("Visa")
                && !transactionDto.getPaymentStatus().equals("Bank transfer")
        ){
            throw new Exception("Payment Status should be OnCash or OnDelivery or Debit or PendingOrder or Visa or Bank transfer!");
        }


        if(transactionDto.getTotalOriginalPrice() == null){
            throw new Exception("totalOriginalPrice should not be null!");
        }

        if(transactionDto.getTotalPaidPrice() == null){
            throw new Exception("totalPaidPrice should not be null!");
        }
        if(transactionDto.getAmountPaid() == null){
            throw new Exception("amountPaid should not be null!");
        }

        if(transactionDto.getRemaining() == null){
            throw new Exception("remaining should not be null!");
        }
        if(transactionDto.getCustomerName() == null || transactionDto.getCustomerName().isEmpty()){
            throw new Exception("customer name required!");
        }
        if((transactionDto.getCustomerPhone() == null || transactionDto.getCustomerPhone().isEmpty())&&(transactionDto.getPaymentStatus().equals("OnDelivery"))){
            throw new Exception("customer Phone required when Payment Status = onDelivery!");
        }
        if((transactionDto.getCustomerAddress() == null || transactionDto.getCustomerAddress().isEmpty())&&(transactionDto.getPaymentStatus().equals("OnDelivery"))){
            throw new Exception("customer Address required when Payment Status = onDelivery!");
        }
        if(transactionDto.getItemsInInvoiceDtoList() == null || transactionDto.getItemsInInvoiceDtoList().isEmpty()){
            throw new Exception("itemsInInvoice shouldn't be null or empty!");
        }

        transactionDto.getItemsInInvoiceDtoList().forEach(itemInInvoiceDto -> {
            try {
                validateItemInInvoiceDto(itemInInvoiceDto);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }
//
    private void validateItemInInvoiceDto(ItemInInvoiceDto itemInInvoiceDto) throws Exception {
        if(itemInInvoiceDto.getItemId() == null ){
            throw new Exception("itemId should not be null!");
        }
        if(itemInInvoiceDto.getItemName() == null || itemInInvoiceDto.getItemName().isEmpty()){
            throw new Exception("itemName should not be null or empty!");
        }
        if(itemInInvoiceDto.getQuantity() == null || itemInInvoiceDto.getQuantity() == 0){
            throw new Exception("quantity should not be null or zero!");
        }
        if(itemInInvoiceDto.getStoreName() == null || itemInInvoiceDto.getStoreName().isEmpty()){
            throw new Exception("storeName should not be null or empty!");
        }
        if(itemInInvoiceDto.getPrice0() == null ||itemInInvoiceDto.getPrice0() == 0){
            throw new Exception("originalPrice should not be null or zero!");
        }
        if(itemInInvoiceDto.getPaidPrice() == null || itemInInvoiceDto.getPaidPrice() == 0){
            throw new Exception("paidPrice should not be null or zero!");
        }


//        Optional<Items> item = itemRepository.findById(itemInInvoiceDto.getItemId());

//        if (item.isEmpty()) {
//            throw new Exception("item id : " + itemInInvoiceDto.getItemId() + " does not exist in db");
//        }
//        if (!item.get().getName().equals(itemInInvoiceDto.getItemName())){
//            throw new Exception("itemName doesn't match itemId in db!");
//        }
//        if (!item.get().getPrice().equals(itemInInvoiceDto.getPrice0())){
//            throw new Exception("original price doesn't match what stored in db!");
//        }
    }
//

    public StatusMessage deleteTransaction(Long transactionId) {
        try {
            transactionRepository.deleteById(transactionId);
        }
        catch (Exception e) {
            return new StatusMessage("fail", e.getMessage(), null);
        }
        return new StatusMessage("success", "transaction record deleted successfully!", null);
    }
}
