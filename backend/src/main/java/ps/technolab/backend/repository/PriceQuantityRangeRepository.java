package ps.technolab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.technolab.backend.entity.PriceQuantityRange;


public interface PriceQuantityRangeRepository extends JpaRepository <PriceQuantityRange,Integer>{
}
