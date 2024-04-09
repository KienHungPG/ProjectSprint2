package com.example.be.controller;

import com.example.be.config.JwtTokenUtil;
import com.example.be.config.JwtUserDetails;
import com.example.be.model.Carts;
import com.example.be.model.Customers;
import com.example.be.model.Users;
import com.example.be.response.JwtRequest;
import com.example.be.response.JwtResponse;
import com.example.be.service.EmailService;
import com.example.be.service.ICartService;
import com.example.be.service.ICustomerService;
import com.example.be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/user")
public class UserRestController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private ICartService cartService;
    @Autowired
    private ICustomerService customerService;

    @PostMapping("/authen")
    public ResponseEntity<?> loginAuthentication(@RequestBody JwtRequest jwtRequest, HttpServletRequest httpServletRequest) throws Exception {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
            GrantedAuthority grantedAuthority = jwtUserDetails.getAuthorities().stream().findFirst().get();
            String token = jwtTokenUtil.generateToken(jwtRequest.getUsername());
            HttpSession httpSession = httpServletRequest.getSession();
            if (httpSession.getAttribute("cart") != null) {
                List<Carts> carts = (List<Carts>) httpSession.getAttribute("cart");
                Customers customers = customerService.getCustomer(jwtUserDetails.getUsername());
                try {
                    cartService.deleteByCustomers(customers);
                } catch (Exception e) {
                    throw e;
                }
                for (int i = 0; i < carts.size(); i++) {
                    cartService.createCart(customers, carts.get(i).getProducts(), carts.get(i).getQuantity());
                }
                httpSession.getAttribute("cart");
            }
            return ResponseEntity.ok(new JwtResponse(token, jwtUserDetails.getUsername(), grantedAuthority != null ? grantedAuthority.getAuthority() : null));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Login fail");
        }
    }

    @PostMapping("/checkEmail")
    public ResponseEntity<?> checkEmail(@RequestBody Users users) {
        Users users1 = userService.findByEmail(users.getEmail());
        if (users1 != null) {
            Random random = new Random();
            int min = 100000;
            int max = 999999;
            int randomCode = random.nextInt((max - min) + 1) + min;
            users1.setVerificationCode(randomCode);
            String mail = "<!DOCTYPE html>\n" +
                    "<html>\n" +
                    "<head>\n" +
                    "<style>\n" +
                    "  .email-body {\n" +
                    "    font-family: Arial, sans-serif;\n" +
                    "    line-height: 1.6;\n" +
                    "    padding: 20px;\n" +
                    "    color: #555;\n" +
                    "  }\n" +
                    "  .email-container {\n" +
                    "    max-width: 600px;\n" +
                    "    margin: 20px auto;\n" +
                    "    padding: 20px;\n" +
                    "    border: 1px solid #ddd;\n" +
                    "    border-radius: 10px;\n" +
                    "    background-color: #ffffff;\n" +
                    "    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                    "  }\n" +
                    "  .email-header {\n" +
                    "    font-size: 24px;\n" +
                    "    color: #333;\n" +
                    "    text-align: center;\n" +
                    "  }\n" +
                    "  .code {\n" +
                    "    font-size: 20px;\n" +
                    "    font-weight: bold;\n" +
                    "    color: #333;\n" +
                    "    padding: 10px;\n" +
                    "    border: 1px dashed #333;\n" +
                    "    display: block;\n" +
                    "    text-align: center;\n" +
                    "    margin: 30px 0;\n" +
                    "  }\n" +
                    "  .email-footer {\n" +
                    "    text-align: center;\n" +
                    "    color: #777;\n" +
                    "    font-size: 12px;\n" +
                    "  }\n" +
                    "</style>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "  <div class=\"email-body\">\n" +
                    "    <div class=\"email-container\">\n" +
                    "      <div class=\"email-header\">Confirmation code</div>\n" +
                    "      <p>Hello,</p>\n" +
                    "      <p>Your confirmation code is:</p>\n" +
                    "      <span class=\"code\">" + randomCode + "</span>\n" +
                    "      <p>Please enter this code into the website to continue the process of confirming your account.</p>\n" +
                    "      <p>If you do not request this code, you can safely skip this email.</p>\n" +
                    "      <div class=\"email-footer\">\n" +
                    "        Best regards,<br>\n" +
                    "        Kwatch\n" +
                    "      </div>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</body>\n" +
                    "</html>\n";
            try {
                userService.editUser(users1);
                emailService.sendMail(users1.getEmail(), "Confirmation code", mail);
            } catch (Exception e) {
                System.out.println(e);
            }
            return ResponseEntity.ok(users1.getId());
        } else {
            return ResponseEntity.badRequest().body("Email incorrect");
        }
    }

    @PostMapping("/checkCode")
    public ResponseEntity<?> checkCode(@RequestBody Users users) {
        Users users1 = userService.findById(users.getId());
        if (users1.getVerificationCode().toString().equals(users.getVerificationCode().toString())) {
            return ResponseEntity.ok(users.getId());
        } else {

            return ResponseEntity.badRequest().body("Confirm fail");
        }
    }

    @PatchMapping("/resetPassword")
    public ResponseEntity<?> createNewPassword(@RequestBody Users user) {
        if (user.getPassword().length() < 8) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The password must not be less than 8 characters !!");
        }
        try {
            userService.saveNewPassword(user);
            return ResponseEntity.ok("Change the password successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Change the password failure !!");
        }
    }
}
