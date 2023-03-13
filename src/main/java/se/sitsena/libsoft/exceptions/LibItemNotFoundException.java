package se.sitsena.libsoft.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class LibItemNotFoundException extends ResponseStatusException {
    public LibItemNotFoundException() {
        super(HttpStatus.NOT_FOUND, "Book not found");
    }
}
