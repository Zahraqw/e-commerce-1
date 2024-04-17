package ps.technolab.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "invoices")

public class Invoices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long itemId;

    private String itemName;

    private Integer quantity;

    private String storeName;

    private Double discountPrice;

    private Double topPrice;

    private Double price0;

    private Double price1;

    private Double price2;

    private Double price3;

    private Double paidPrice;

}
