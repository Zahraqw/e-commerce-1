package ps.technolab.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.technolab.backend.entity.OrderStatus;
import ps.technolab.backend.entity.PriceQuantityRange;
import ps.technolab.backend.entity.ProductStatus;
import ps.technolab.backend.entity.Stores;
import ps.technolab.backend.service.ConstantDataService;

import java.util.List;

@RestController
public class ConstantDataController {
    @Autowired
    private ConstantDataService constantDataService;

    @GetMapping("/get_all_order_status")
    public List<OrderStatus> getAllOrderStatus() {
        return constantDataService.getAllOrderStatus();
    }
    @GetMapping("/get_all_stores")
    public List<Stores> getAllStores() {
        return constantDataService.getAllStores();
    }

    @GetMapping("/get_all_price_quantity_range")
    public List<PriceQuantityRange> getAllPriceQuantityRange() {
        return constantDataService.getAllPriceQuantityRange();
    }
    @GetMapping("/get_all_product_status")
    public List<ProductStatus> getAllProductStatus() {
        return constantDataService.getAllProductStatus();
    }


}
