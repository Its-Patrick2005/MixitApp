package backend.recimeclone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableMongoAuditing
@SpringBootApplication
public class RecimeCloneApplication {

    public static void main(String[] args) {
        SpringApplication.run(RecimeCloneApplication.class, args);
    }

}
