package ps.technolab.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ps.technolab.backend.entity.OrderStatus;
import ps.technolab.backend.entity.PriceQuantityRange;
import ps.technolab.backend.entity.ProductStatus;
import ps.technolab.backend.entity.Stores;
import ps.technolab.backend.repository.OrderStatusRepository;
import ps.technolab.backend.repository.PriceQuantityRangeRepository;
import ps.technolab.backend.repository.ProductStatusRepository;
import ps.technolab.backend.repository.StoresRepository;

import java.util.List;

@Service
public class ConstantDataService {
    @Autowired
   private OrderStatusRepository orderStatusRepositry;

    @Autowired
    private StoresRepository storesRepository;

    @Autowired
    private ProductStatusRepository productStatusRepository;

    @Autowired
    private PriceQuantityRangeRepository priceQuantityRangeRepository;

    public List<OrderStatus> getAllOrderStatus(){
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        return orderStatusRepositry.findAll(sort);
    }

    public List<Stores> getAllStores() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        return storesRepository.findAll(sort);
    }

    public List<ProductStatus> getAllProductStatus() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        return productStatusRepository.findAll(sort);
    }

    public List<PriceQuantityRange> getAllPriceQuantityRange() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        return priceQuantityRangeRepository.findAll(sort);
    }
}
