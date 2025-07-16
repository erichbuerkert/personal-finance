package com.eb.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "eb.security.jwt")
public class JwtProperties {
    private String secret;
    private long expirationMs = 86400000;
}
