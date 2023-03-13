package se.sitsena.libsoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;

@SpringBootApplication
public class LibrarySolutionsApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibrarySolutionsApplication.class, args);
    }
}
