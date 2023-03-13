package se.libsoft.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import se.libsoft.models.Employee;

@Service
@PropertySource("classpath:salary-coefficient.properties")
public class SalaryService {

    @Value("${employee}")
    private float employeeCoef;

    @Value("${manager}")
    private float managerCoef;

    @Value("${ceo}")
    private float ceoCoef;

    public float calcSalary(Employee employee) {
        if (employee.isCeo()) {
            return employee.getSalary() * ceoCoef;
        } else if (employee.isManager()) {
            return employee.getSalary() * managerCoef;
        } else {
            return employee.getSalary() * employeeCoef;
        }
    }
}
