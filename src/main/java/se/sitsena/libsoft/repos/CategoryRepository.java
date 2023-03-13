package se.sitsena.libsoft.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.sitsena.libsoft.models.Category;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    public Optional<Category> findByCategoryName(String categoryName);
}
