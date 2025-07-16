package com.eb.security.cors;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "eb.security.cors")
public class CorsProperties {
    private List<String> allowedOrigins = List.of();
    private List<String> allowedMethods = List.of();
    private List<String> allowedHeaders = List.of();
    private boolean allowCredentials = true;
}
