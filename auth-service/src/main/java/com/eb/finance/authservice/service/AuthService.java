package com.eb.finance.authservice.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

import com.eb.finance.authservice.entity.User;
import com.eb.finance.authservice.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final Key jwtSecretKey;
    private final long jwtExpirationMs = 86400000; // 1 day

    public AuthService(UserRepository userRepository, @Value("${jwt.secret}") String jwtSecret) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.jwtSecretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public void register(String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        String hashed = passwordEncoder.encode(password);
        User user = User.builder().email(email).password(hashed).build();
        userRepository.save(user);
    }

    public String login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return generateToken(userOpt.get());
    }

    private String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(jwtSecretKey)
                .compact();
    }

    public String validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(token);
            return claims.getBody().getSubject();
        } catch (JwtException e) {
            return null;
        }
    }
}
