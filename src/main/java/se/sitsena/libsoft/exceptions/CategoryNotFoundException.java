package se.sitsena.libsoft.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CategoryNotFoundException extends ResponseStatusException {
    public CategoryNotFoundException() {
        super(HttpStatus.NOT_FOUND, "Category not found");
    }
}
