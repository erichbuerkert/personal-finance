package com.eb.finance.authservice.feign;

import com.eb.finance.dto.user.UserProfileCreateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service", url = "${eb.feign.user-service.url}")
public interface UserServiceClient {

    @PostMapping("/users")
    void createProfile(@RequestBody UserProfileCreateRequest request);
}
