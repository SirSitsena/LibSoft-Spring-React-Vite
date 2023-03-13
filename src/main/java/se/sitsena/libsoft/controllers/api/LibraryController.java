package se.sitsena.libsoft.controllers.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import jakarta.validation.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.sitsena.libsoft.exceptions.LibItemNotFoundException;
import se.sitsena.libsoft.models.Category;
import se.sitsena.libsoft.models.LibraryItem;
import se.sitsena.libsoft.models.validating.OnCreate;
import se.sitsena.libsoft.models.validating.OnUpdate;
import se.sitsena.libsoft.repos.CategoryRepository;
import se.sitsena.libsoft.repos.LibraryRepository;
import se.sitsena.libsoft.services.ValidatingService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class LibraryController {
    @Autowired
    private LibraryRepository libraryRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ValidatingService validatingService;

    @GetMapping("/lib-items")
    public Map<String, Object> getAll(@RequestParam(required = false) Boolean borrowable) {
        Map<String,Object> root = new HashMap<>();
        List<LibraryItem> list;

        if(borrowable!=null) {
            if(borrowable){
                list = libraryRepository.findByIsBorrowableIsFalse();
            } else {
                list = libraryRepository.findByIsBorrowableIsTrue();
            }
        } else  {
            list = libraryRepository.findAll();
        }

        root.put("lib-items", list);
        root.put("size", list.size());

        return root;
    }

    @GetMapping(path = "lib-item/{id}")
    public LibraryItem getById(@PathVariable Long id) {
        return libraryRepository.findById(id)
                .orElseThrow(LibItemNotFoundException::new);
    }

    @PostMapping(path = "lib-item/add")
    @Validated(OnCreate.class)
    public LibraryItem add(@Valid @RequestBody LibraryItem item) {
        validatingService.validateLibraryItem(item);

        fixCategoryId(item);
        return libraryRepository.save(item);
    }

    @PostMapping(path = "lib-item/update")
    @Validated(OnUpdate.class)
    public LibraryItem updateById(@Valid @RequestBody LibraryItem item) {
        validatingService.validateLibraryItem(item);

        return libraryRepository.findById(item.getId()).map(i -> {
            fixCategoryId(item);
            return libraryRepository.save(item);
        }).orElseThrow(LibItemNotFoundException::new);
    }

    @DeleteMapping(path = "lib-item/{id}")
    public Boolean deleteById(@PathVariable Long id) {
        return libraryRepository.findById(id).map(item -> {
            libraryRepository.delete(item);
            return true;
        }).orElse(false);
    }
    // We rewrite Category in LibraryItem because in the request Category it starts by 0 id from default.
    //TODO перезаписываем Category в LibraryItem так как в запросе Category идет с нулевой ид по умолчанию
    private void fixCategoryId(LibraryItem item) {
        Category category = CategoryController.getCategory((String) item.getCategory(), categoryRepository);
        item.setCategory(category);
    }
}
