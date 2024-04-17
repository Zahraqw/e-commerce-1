package ps.technolab.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ItemInInvoiceDto {
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
    private String fileName;
}
