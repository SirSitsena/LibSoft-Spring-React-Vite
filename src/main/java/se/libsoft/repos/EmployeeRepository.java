package se.libsoft.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import se.libsoft.models.Employee;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findEmployeesByIsCeoIsTrue();

}