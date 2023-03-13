package se.sitsena.libsoft.repos;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.sitsena.libsoft.models.LibraryItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibraryRepository extends JpaRepository<LibraryItem, Long> {
    List<LibraryItem> findByTitleContainingIgnoreCase(String query);//TODO remove
    List<LibraryItem> findAll();
    Page<LibraryItem> findAll(Pageable pageable);

    List<LibraryItem> findByIsBorrowableIsFalse();
    List<LibraryItem> findByIsBorrowableIsTrue();
}
