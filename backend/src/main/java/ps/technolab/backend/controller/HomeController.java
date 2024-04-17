package ps.technolab.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping(value = {"/"}) // http get request!
@CrossOrigin
public class HomeController {

    @GetMapping //http get request! http://localhost:8080/
    public String home (){
        return "hello from technolab home page :)";
    }

    @GetMapping("/ServerTime")
    public String utc() {
        return OffsetDateTime.now(ZoneId.of("Asia/Gaza")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
