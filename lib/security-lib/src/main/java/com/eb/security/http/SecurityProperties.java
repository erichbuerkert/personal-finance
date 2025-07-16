package com.eb.security.http;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "eb.security.http")
public class SecurityProperties {
    private List<String> permitAllPaths = List.of();
}
