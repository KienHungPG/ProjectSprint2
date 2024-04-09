package com.example.be.service;

import com.example.be.config.JwtUserDetails;
import com.example.be.model.Users;
import com.example.be.repository.IUserRepository;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService,IUsersService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Users findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Users findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void editUser(Users users) {
        userRepository.save(users);
    }

    @Override
    public Users findById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public void saveNewPassword(Users users) {
        Users users1 = findById(users.getId());
        String password = passwordEncoder.encode(users.getPassword());
        users1.setPassword(password);
        userRepository.saveNewPassword(users1.getId(),users1.getPassword());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = findByUsername(username);
        if (users == null){
            throw new UsernameNotFoundException("Not found" + username);
        }
        List<GrantedAuthority> grantedAuthorities =new ArrayList<>();
        String role = users.getRoles().getRoleName();
        grantedAuthorities.add(new SimpleGrantedAuthority(role));
        return new JwtUserDetails(users.getId(),users.getUsername(),users.getPassword(),grantedAuthorities);
    }
}
