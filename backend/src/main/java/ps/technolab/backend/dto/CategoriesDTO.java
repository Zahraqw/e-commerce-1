package ps.technolab.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class CategoriesDTO {
    private String name;

    private List<String> subcategories;
}
