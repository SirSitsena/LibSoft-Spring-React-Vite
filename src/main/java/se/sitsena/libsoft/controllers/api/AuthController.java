package se.sitsena.libsoft.controllers.api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.sitsena.libsoft.models.User;
import se.sitsena.libsoft.repos.UserRepository;
import se.sitsena.libsoft.services.AuthService;

import java.rmi.ServerException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthService authService;

    // A pretty simple realisation of authorization, we simply generate the token when we find the user
    @PostMapping("/auth")
    public Map<String, Object> auth(@RequestBody Map<String,String> args) {

        String username = args.getOrDefault("username","");
        String password = args.getOrDefault("password","");

        HashMap<String, Object> map = new HashMap<>();
        User user = userRepository.findUserByUsername(username);

        if (user!=null && user.getHashPassword().equals(password)) {

            String generateKey = authService.generateKey();
            map.put("username",user.getUsername());
            map.put("token", generateKey);  // We return the token to client

            user.setToken(generateKey);     // And then we save it to the database
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found or incorrect password");
        }

        return map;
    }

    @PostMapping("/valid")
    public Boolean valid(@RequestBody Map<String,String> args) {

        String username = args.getOrDefault("username","");
        String token = args.getOrDefault("token","");

        HashMap<String, Object> map = new HashMap<>();
        User user = userRepository.findUserByUsername(username);

        return user!=null && token.equals(user.getToken());
    }
}
