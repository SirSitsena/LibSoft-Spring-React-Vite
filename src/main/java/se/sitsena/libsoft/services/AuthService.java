package se.sitsena.libsoft.services;

import org.apache.tomcat.util.buf.HexUtils;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import java.security.NoSuchAlgorithmException;

@Service
public class AuthService {
    private KeyGenerator aes = null;

    public AuthService() {
        try {
            aes = KeyGenerator.getInstance("AES");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateKey() {
        return HexUtils.toHexString(aes.generateKey().getEncoded());
    }
}
