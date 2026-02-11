package com.contoso.socialapp.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@Slf4j
public class DocumentationController {
    
    @GetMapping(value = "/openapi.yaml", produces = "text/yaml")
    public ResponseEntity<String> getOpenApiYaml() {
        try {
            ClassPathResource resource = new ClassPathResource("openapi.yaml");
            String content = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("text/yaml"))
                    .body(content);
        } catch (IOException e) {
            log.error("Failed to load openapi.yaml", e);
            return ResponseEntity.notFound().build();
        }
    }
}