package ps.technolab.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.technolab.backend.dto.CategoriesDTO;
import ps.technolab.backend.entity.Categories;
import ps.technolab.backend.service.CategoriesService;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/categories")
@CrossOrigin
public class CategoriesController {

    @Autowired
    private CategoriesService categoryService;

    @GetMapping("/subcategories")
    public List<CategoriesDTO> getCategoryHierarchy() {
        List<CategoriesDTO> categoryDTOList = new ArrayList<>();
        List<Categories> categoriesList = categoryService.getAllCategories();

        // Convert Categories to CategoryDTO
        for (Categories category : categoriesList) {
            if (category.getParent_id() == null) {
                CategoriesDTO categoryDTO = new CategoriesDTO();
                categoryDTO.setName(category.getName());

                Set<Categories> childCategories = category.getChildCategories();
                if (childCategories.isEmpty()) {
                    // If category doesn't have subcategories, add itself as subcategory
                    List<String> subcategories = new ArrayList<>();
                    subcategories.add(category.getName());
                    categoryDTO.setSubcategories(subcategories);
                } else {
                    // Add subcategories
                    List<String> subcategories = new ArrayList<>();
                    for (Categories subcategory : childCategories) {
                        subcategories.add(subcategory.getName());
                    }
                    categoryDTO.setSubcategories(subcategories);
                }

                categoryDTOList.add(categoryDTO);
            }

        }


        return categoryDTOList;
    }
}

