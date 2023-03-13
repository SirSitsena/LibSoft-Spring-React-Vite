package se.sitsena.libsoft.repos;
import org.springframework.data.jpa.repository.JpaRepository;
import se.sitsena.libsoft.models.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findEmployeesByIsCeoIsTrue();
    List<Employee> findAllByIsCeoIsTrue();
}