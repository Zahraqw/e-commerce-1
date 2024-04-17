package ps.technolab.backend.entity;

import jakarta.persistence.*;

@Table(name = "secondary_items_images")
@Entity
public class SecondaryItemsImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Items item_id;

    @Column
    private String image;
}
