package com.contoso.socialapp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Simple Social Media Application API")
                        .version("1.0.0")
                        .description("API for a basic Social Networking Service (SNS) supporting posts, comments, and likes. Follows an API-first approach for web/mobile backends."))
                .servers(List.of(
                        new Server().url("http://localhost:8080/api")
                ));
    }
}