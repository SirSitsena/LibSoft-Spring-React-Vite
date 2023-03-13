package se.libsoft.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.libsoft.repos.UserRepository;
import se.libsoft.services.AuthService;
import se.libsoft.models.User;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthService authService;

    // A pretty simple realisation of authorization, I simply generate the token the user is found
    @PostMapping("/auth")
    public Map<String, Object> auth(@RequestBody Map<String, String> args) {

        String username = args.getOrDefault("username", "");
        String password = args.getOrDefault("password", "");

        HashMap<String, Object> map = new HashMap<>();
        User user = userRepository.findUserByUsername(username);

        if (user != null && user.getHashPassword().equals(password)) {

            String generateKey = authService.generateKey();
            map.put("username", user.getUsername());
            map.put("token", generateKey);  // The token returns to client

            user.setToken(generateKey);     // And then it is saved in the db
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found or incorrect password");
        }

        return map;
    }

    @PostMapping("/valid")
    public Boolean valid(@RequestBody Map<String, String> args) {

        String username = args.getOrDefault("username", "");
        String token = args.getOrDefault("token", "");

        HashMap<String, Object> map = new HashMap<>();
        User user = userRepository.findUserByUsername(username);

        return user != null && token.equals(user.getToken());
    }
}
