package se.libsoft.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class LibItemNotFoundException extends ResponseStatusException {
    public LibItemNotFoundException() {
        super(HttpStatus.NOT_FOUND, "Book not found");
    }
}
