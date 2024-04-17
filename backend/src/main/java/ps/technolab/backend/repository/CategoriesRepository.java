package ps.technolab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.technolab.backend.entity.Categories;

public interface CategoriesRepository extends JpaRepository<Categories, Long> {

}