package se.libsoft.controllers.api;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import se.libsoft.exceptions.CategoryNotFoundException;
import se.libsoft.models.Category;
import se.libsoft.models.validating.OnUpdate;
import se.libsoft.repos.CategoryRepository;
import se.libsoft.repos.LibraryRepository;

import java.util.*;
import java.util.stream.Collectors;

@Validated
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class CategoryController {
    @Autowired
    private LibraryRepository libraryRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @PersistenceContext
    EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @GetMapping("/categories")
    public Map<String, Object> getAllCategories() {
        Map<String, Object> root = new HashMap<>();

        Map<Long, Category> categories = (Map<Long, Category>) entityManager
                .createQuery("select category, count(*) from LibraryItem group by category")
                .getResultStream()
                .map(o -> {
                    Object[] arr = (Object[]) o;
                    Category category = ((Category) arr[0]);
                    category.setTimesUsed(((Long) arr[1]).intValue());
                    return category;
                }).collect(Collectors.toMap((o) -> ((Category) o).getId(), (o) -> ((Category) o)));

        List<Category> all = categoryRepository.findAll();
        for (Category c : all) {
            if (!categories.containsKey(c.getId())) {
                c.setTimesUsed(0);
            }
        }

        root.put("categories", all);
        root.put("size", all.size());

        return root;
    }

    @PostMapping(path = "category/add/{name}")
    public Category add(@NotBlank @PathVariable String name) {
        return getCategory(name, categoryRepository);
    }

    @PostMapping(path = "category/update")
    @Validated(OnUpdate.class)
    public Category updateById(@Valid @RequestBody Category item) {
        return libraryRepository.findById(item.getId()).map(i -> {
            return categoryRepository.save(item);
        }).orElseThrow(CategoryNotFoundException::new);
    }

    @DeleteMapping(path = "category/{id}")
    public Boolean deleteCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id).map(item -> {

            long used = (long) entityManager
                    .createQuery("select count(*) from LibraryItem where category.id = ?1")
                    .setParameter(1, id).getSingleResult();

            if (used == 0) {
                categoryRepository.delete(item);
                return true;
            } else {
                return false;
            }
        }).orElseThrow(CategoryNotFoundException::new);
    }

    static Category getCategory(String name, CategoryRepository repository) {
        if (name == null || name.isEmpty()) throw new CategoryNotFoundException();

        return repository.findByCategoryName(name).orElseGet(() -> {
            return repository.save(new Category(name));
        });
    }
}
