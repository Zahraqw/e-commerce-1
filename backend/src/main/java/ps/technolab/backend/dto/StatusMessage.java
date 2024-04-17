package ps.technolab.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Map;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class StatusMessage <T> {
    private String status;
    private T message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Map<String, String> optional;
}
