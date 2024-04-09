package com.example.be.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenUtil {

    private static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    private final String secret = "bNjWIq9nGC";


    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public Claims extractClaims(String token) {
        byte[] secretBytes = Base64.getEncoder().encode(secret.getBytes());
        return Jwts.parser()
                .setSigningKey(new SecretKeySpec(secretBytes, SignatureAlgorithm.HS512.getJcaName()))
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token, JwtUserDetails userDetails) {
        try {
            JwtParser parser = Jwts.parser().setSigningKey(secret);
            Claims claims = parser.parseClaimsJws(token).getBody();

            // Kiểm tra tính hợp lệ của token bằng cách so sánh username trong token với thông tin người dùng được truyền vào
            if (claims.getSubject().equals(userDetails.getUsername())) {
                return true;
            }
        } catch (Exception e) {
            throw e;
        }

        return false;
    }

}