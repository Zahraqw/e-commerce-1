package ps.technolab.backend.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Set;

@Table(name = "items")
@Entity
public class Items {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true, columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci")
    private String name;

    @Column(nullable = false, columnDefinition="varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'published'")
    private String status;

    @Column(nullable = false,unique = true)
    private String barcode;

    @Column(columnDefinition = "varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL UNIQUE")
    private String second_barcode;

    @Column
    private Integer sort_order;

    @Column
    private Date availability_date;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean retire;

    @Column(nullable = false)
    private Double price0;

    @Column(nullable = false)
    private Double price1;

    @Column(nullable = false)
    private Double price2;

    @Column(nullable = false)
    private Double price3;

    @Column
    private Double discount_price;

    @Column
    private Date sale_end_date;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean hide_price;

    @Column
    private String image;

    @Column
    private String dimensions;

    @Column
    private String weight;

    @Column(columnDefinition = "TEXT")
    private String description;


    @Column
    private String created_by;

    @Column
    private String update_by;
    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp created_at;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp update_at;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
            name = "items_categories",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Categories> categories;


    public Items() {
        this.price0 = 0.0;
        this.price1 = this.price0;
        this.price2 = this.price1;
        this.price3 = this.price2;
    }
}
