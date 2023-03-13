package se.sitsena.libsoft.controllers.api;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import se.sitsena.libsoft.exceptions.LibItemNotFoundException;
import se.sitsena.libsoft.models.LibraryItem;
import se.sitsena.libsoft.repos.LibraryRepository;

import java.util.Date;

@Validated
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class BorrowingController {
    @Autowired
    private LibraryRepository libraryRepository;

    @GetMapping("/borrow/{id}")
    public LibraryItem getBorrow(
            @NotNull @Min(0) @PathVariable Long id
    ){
        return libraryRepository.findById(id)
                .orElseThrow(LibItemNotFoundException::new);
    }

    @GetMapping("/borrow/{id}/{name}")
    public LibraryItem addBorrow(
            @NotNull @Min(0) @PathVariable Long id,
            @NotBlank @PathVariable String name
    ){
        return libraryRepository.findById(id).map(item -> {

            item.setIsBorrowable(false);
            item.setBorrower(name);
            item.setBorrowDate(new Date());

            return libraryRepository.save(item);
        }).orElseThrow(LibItemNotFoundException::new);
    }

    @DeleteMapping(path = "/borrow/{id}")
    public LibraryItem deleteById(@PathVariable Long id) {
        return libraryRepository.findById(id).map(item -> {

            item.setIsBorrowable(true);
            item.setBorrower(null);
            item.setBorrowDate(null);

            return libraryRepository.save(item);
        }).orElseThrow(LibItemNotFoundException::new);
    }
}
