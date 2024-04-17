package ps.technolab.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class TransactionDto {
    private Long id;
    private String transactionNumber;
    private String createdBy;
    private Date createdAt;

    private Boolean isTaxIncluded;
    private Double totalOriginalPrice;
    private Double totalPaidPrice;
    private Double amountPaid;
    private Double remaining;
    private String note;
    private String customerName;
    private String customerPhone;
    private String customerAddress;
    private String paymentStatus;


    private List<ItemInInvoiceDto> itemsInInvoiceDtoList = new ArrayList<>();
}
