package se.libsoft.controllers.api;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import se.libsoft.services.ValidatingService;
import se.libsoft.exceptions.LibItemNotFoundException;
import se.libsoft.models.Category;
import se.libsoft.models.LibraryItem;
import se.libsoft.models.validating.OnCreate;
import se.libsoft.models.validating.OnUpdate;
import se.libsoft.repos.CategoryRepository;
import se.libsoft.repos.LibraryRepository;

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
        Map<String, Object> root = new HashMap<>();
        List<LibraryItem> list;

        if (borrowable != null) {
            if (borrowable) {
                list = libraryRepository.findByIsBorrowableIsFalse();
            } else {
                list = libraryRepository.findByIsBorrowableIsTrue();
            }
        } else {
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

    // We rewrite Category from the LibraryItem because in the request the Category is set with 0 id from default.
    // Then by searching in the existing categoryName's if it exists, if yes it gets re-written in LibraryItem
    private void fixCategoryId(LibraryItem item) {
        Category category = CategoryController.getCategory((String) item.getCategory(), categoryRepository);
        item.setCategory(category);
    }
}
