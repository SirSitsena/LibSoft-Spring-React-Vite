package se.sitsena.libsoft.models;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import se.sitsena.libsoft.models.validating.employees.Ceo;
import se.sitsena.libsoft.models.validating.employees.Manager;

@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // By default enabled, but I do not trust them xD
    private Long id;

    @NotBlank
    @Column(name = "first_name")
    private String firstName;

    @NotBlank
    @Column(name = "last_name")
    private String lastName;

    @NotNull
    @Column(name = "salary")
    private Float salary;

    @NotNull
    @AssertTrue(groups = Ceo.class)
    @AssertFalse(groups = {Employee.class, Manager.class})
    @Column(name = "is_ceo")
    private Boolean isCeo;

    @NotNull
    @AssertFalse(groups = Employee.class)
    @AssertTrue(groups = Manager.class)
    @Column(name = "is_manager")
    private Boolean isManager;

    @NotNull(groups = Employee.class)
    @Column(name = "manager_id")
    private Integer managerId;

    @Transient
    private Integer subordinatesNum;

    public Employee() {
    }

    public Employee(String firstName, String lastName, Float salary, Boolean isCeo, Boolean isManager, Integer managerId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.isCeo = isCeo;
        this.isManager = isManager;
        this.managerId = managerId;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Float getSalary() {
        return salary;
    }

    public void setSalary(Float salary) {
        this.salary = salary;
    }

    public Boolean isCeo() {
        return isCeo;
    }

    public void setCeo(Boolean ceo) {
        isCeo = ceo;
    }

    public Boolean isManager() {
        return isManager;
    }

    public void setManager(Boolean manager) {
        isManager = manager;
    }

    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }

    public Integer getSubordinatesNum() {
        return subordinatesNum;
    }

    public void setSubordinatesNum(Integer subordinatesNum) {
        this.subordinatesNum = subordinatesNum;
    }
}


