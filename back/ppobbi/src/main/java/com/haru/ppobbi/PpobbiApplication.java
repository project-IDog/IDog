package com.haru.ppobbi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class PpobbiApplication {

    public static void main(String[] args) {
        SpringApplication.run(PpobbiApplication.class, args);
    }

}
