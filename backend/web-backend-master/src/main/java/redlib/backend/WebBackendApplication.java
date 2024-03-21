package redlib.backend;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("redlib.backend.dao")
@Slf4j
public class WebBackendApplication implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication.run(WebBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Do some global init
    }
}
