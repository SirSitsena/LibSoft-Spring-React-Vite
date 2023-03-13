package se.sitsena.libsoft.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ManagerNotFoundException extends ResponseStatusException {
    public ManagerNotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND, "The person with id "+id+" is not a Manager");
    }
}
