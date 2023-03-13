package se.libsoft.models;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "category_name", unique = true)
    private String categoryName;

    @Transient
    private Integer timesUsed;

    public Category(String categoryName) {
        this.categoryName = categoryName;
    }

    public Category() {
    }

    public Long getId() {
        return id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @JsonSetter
    public void setTimesUsed(Integer count) {
        timesUsed = count;
    }

    @JsonGetter
    public Integer getTimesUsed() {
        return timesUsed;
    }
}

