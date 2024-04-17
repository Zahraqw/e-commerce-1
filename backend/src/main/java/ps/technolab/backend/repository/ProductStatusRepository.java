package ps.technolab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.technolab.backend.entity.ProductStatus;


public interface ProductStatusRepository extends JpaRepository <ProductStatus,Integer>{
}
