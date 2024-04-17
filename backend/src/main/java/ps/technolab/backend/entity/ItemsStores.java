package ps.technolab.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name = "items_stores")
@Entity
public class ItemsStores {

    @EmbeddedId
    ItemsStoresKey id;

    @ManyToOne
    @MapsId("item_id")
    @JoinColumn(name = "item_id")
    Items item;

    @ManyToOne
    @MapsId("store_id")
    @JoinColumn(name = "store_id")
    Stores store;

    @Column
    private Double qty;

    @Column
    private Double threshold;
    @Column
    private String unit;

    @Column
    private String x;

    @Column
    private String y;

}
