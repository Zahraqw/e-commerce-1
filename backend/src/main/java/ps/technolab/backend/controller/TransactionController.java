package ps.technolab.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ps.technolab.backend.dto.StatusMessage;
import ps.technolab.backend.dto.TransactionDto;
import ps.technolab.backend.service.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/newTransaction")
    public StatusMessage newTransaction(@RequestBody TransactionDto transactionDto){
        return transactionService.newTransaction(transactionDto);
    }

//    @GetMapping("/getTransactions")
//    public StatusMessage getTransactions(@RequestParam(required = false) Date dateFrom,
//                                         @RequestParam(required = false) Date dateTo,
//                                         @RequestParam(required = false) String status,
//                                         @RequestParam(required = false) String itemName,
//                                         @RequestParam(required = false) String createdBy,
//                                         @RequestParam(required = false) String customerName,
//                                         @RequestParam(required = false) String note) {
//        return transactionService.getTransactions(dateFrom, dateTo, status, itemName, createdBy, customerName, note);
//    }

//    @PutMapping("/updateTransaction")
//    public StatusMessage updateTransaction(@RequestBody TransactionDto transactionDto) {
//        return transactionService.updateTransaction(transactionDto);
//    }

    @DeleteMapping("/deleteTransaction")
    public StatusMessage deleteTransaction(@RequestParam Long transactionId) {
        return transactionService.deleteTransaction(transactionId);
    }

}
