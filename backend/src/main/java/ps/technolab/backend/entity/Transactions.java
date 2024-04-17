package ps.technolab.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@Table(name = "transactions")
@Entity
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String transactionNumber;
    private String createdBy;
    private Date createdAt;

    @Column(nullable = false)
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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Invoices> itemsInInvoice = new ArrayList<>();

}
