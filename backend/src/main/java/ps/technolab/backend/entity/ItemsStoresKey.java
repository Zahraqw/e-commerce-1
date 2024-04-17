package ps.technolab.backend.entity;

import jakarta.persistence.Column;

public class ItemsStoresKey {
    @Column
    Long item_id;

    @Column
    Long store_id;
}
