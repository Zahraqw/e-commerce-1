package ps.technolab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.technolab.backend.entity.ItemsStores;

import java.util.List;
import java.util.Optional;

public interface ItemStoreRepository extends JpaRepository<ItemsStores,Long> {
    List<ItemsStores> findByItemIdIn(List<Long> itemIds);
    Optional<ItemsStores> findByItemIdAndStoreId(Long itemId, Long storeId);

    List<ItemsStores> findAllByItemId(Long itemId);
}
