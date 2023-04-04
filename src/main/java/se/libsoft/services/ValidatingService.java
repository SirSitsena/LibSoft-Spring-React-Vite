package se.libsoft.services;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.server.ResponseStatusException;
import se.libsoft.models.validating.employees.Employee;
import se.libsoft.models.LibraryItem;
import se.libsoft.models.validating.employees.Ceo;
import se.libsoft.models.validating.employees.Manager;
import se.libsoft.models.validating.library.AudioBook;
import se.libsoft.models.validating.library.Book;
import se.libsoft.models.validating.library.Dvd;
import se.libsoft.models.validating.library.ReferenceBook;

import java.util.Set;

@Service
@Validated
public class ValidatingService {    // TODO
    private Validator validator;

    ValidatingService(Validator validator) {
        this.validator = validator;
    }

    public void validateLibraryItem(LibraryItem item) {
        Class group;

        switch (item.getType()) {
            case "book" -> group = Book.class;
            case "audio_book" -> group = AudioBook.class;
            case "reference_book" -> group = ReferenceBook.class;
            case "dvd" -> group = Dvd.class;
            default -> {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown type: " + item.getType());
            }
        }

        Set<ConstraintViolation<LibraryItem>> violations = validator.validate(item, group);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }

    public void validateEmployee(se.libsoft.models.Employee item) {
        Class group;

        if (item.isCeo()) {
            group = Ceo.class;
        } else if (item.isManager()) {
            group = Manager.class;
        } else {
            group = Employee.class;
        }

        Set<ConstraintViolation<se.libsoft.models.Employee>> violations = validator.validate(item, group);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }
}
