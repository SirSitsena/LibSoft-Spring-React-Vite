package se.libsoft.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.libsoft.models.LibraryItem;

import java.util.List;

@Repository
public interface LibraryRepository extends JpaRepository<LibraryItem, Long> {

    List<LibraryItem> findAll();

    Page<LibraryItem> findAll(Pageable pageable);

    List<LibraryItem> findByIsBorrowableIsFalse();

    List<LibraryItem> findByIsBorrowableIsTrue();
}
