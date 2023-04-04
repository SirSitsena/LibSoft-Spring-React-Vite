package se.libsoft.controllers.api;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.libsoft.exceptions.ManagerNotFoundException;
import se.libsoft.exceptions.EmployeeNotFoundException;
import se.libsoft.models.Employee;
import se.libsoft.models.validating.OnCreate;
import se.libsoft.models.validating.OnUpdate;
import se.libsoft.repos.EmployeeRepository;
import se.libsoft.services.SalaryService;
import se.libsoft.services.ValidatingService;

import java.util.AbstractMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Validated
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)    // TODO
public class EmployeeController {
    @Autowired
    private EmployeeRepository repository;
    @Autowired
    private SalaryService salaryService;
    @Autowired
    private ValidatingService validatingService;
    @PersistenceContext
    EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @GetMapping("/employees")
    public Map<String, Object> getAll() {
        Map<String, Object> root = new HashMap<>();

        Map<Integer, Integer> employees = (Map<Integer, Integer>) entityManager
                .createQuery("select managerId, count(*) from Employee group by managerId")
                .getResultStream()
                .map(o -> {
                    Object[] arr = (Object[]) o;
                    Integer employeeId = ((Integer) arr[0]);
                    int count = ((Long) arr[1]).intValue();
                    return new AbstractMap.SimpleEntry<Integer, Integer>(employeeId, count);
                }).collect(Collectors.toMap((o) ->
                        ((AbstractMap.SimpleEntry) o).getKey(), (o) ->
                        ((AbstractMap.SimpleEntry) o).getValue()));

        List<Employee> all = repository.findAll();
        for (Employee e : all) {
            int key = e.getId().intValue();
            e.setSubordinatesNum(employees.getOrDefault(key, 0));
        }

        root.put("employees", all);
        root.put("size", all.size());

        return root;
    }

    @GetMapping(path = "employee/{id}")
    public Employee getById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(EmployeeNotFoundException::new);
    }

    @PostMapping(path = "employee/add")
    @Validated(OnCreate.class)
    public Employee add(@Valid @RequestBody Employee item) {
        validatingService.validateEmployee(item);
        checkManagerId(item);
        checkCeo(item);

        item.setSalary(salaryService.calcSalary(item));
        return repository.save(item);
    }

    @PostMapping(path = "employee/update")
    @Validated(OnUpdate.class)
    public Employee updateById(@Valid @RequestBody Employee item) {
        validatingService.validateEmployee(item);
        checkManagerId(item);
        checkCeo(item);

        return repository.findById(item.getId()).map(i -> {
            return repository.save(item);
        }).orElseThrow(EmployeeNotFoundException::new);
    }

    @DeleteMapping(path = "employee/{id}")
    public Boolean deleteById(@PathVariable Long id) {

        return repository.findById(id).map(item -> {
            long used = (long) entityManager
                    .createQuery("select count(*) from Employee where managerId = ?1")
                    .setParameter(1, id).getSingleResult();

            if (used == 0) {
                repository.delete(item);
                return true;
            } else {
                return false;
            }
        }).orElseThrow(EmployeeNotFoundException::new);
    }

    private void checkCeo(Employee item) {
        if (item.isCeo()) {
            repository.findEmployeesByIsCeoIsTrue().ifPresent(employee -> {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no space for 2 CEOs in this " +
                        "company");
            });
        }
    }

    private void checkManagerId(Employee item) {
        if (item.getManagerId() != null) {
            if (item.getId() != null && item.getManagerId() == item.getId().intValue())
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No self-management in here please, " +
                        "SAY NO TO CORRUPTION");

            repository.findById(Long.valueOf(item.getManagerId())).ifPresentOrElse(employee -> {
                if (!employee.isManager()) {
                    throw new ManagerNotFoundException(employee.getId());
                }
            }, () -> {
                throw new EmployeeNotFoundException();
            });
        }
    }
}
