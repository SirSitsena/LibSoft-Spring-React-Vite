package se.libsoft.models;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonSetter;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import se.libsoft.models.validating.OnUpdate;
import se.libsoft.models.validating.library.AudioBook;
import se.libsoft.models.validating.library.Book;
import se.libsoft.models.validating.library.Dvd;
import se.libsoft.models.validating.library.ReferenceBook;

import java.util.Date;

/*
 * TODO Этот класс используеться для создания сущности таблицы lib_items
 * также используеться для валидации запросов приходящих от клиента.
 * в классе мы проводим валидацию для 4 типов: Книги, двд, аудио книги и справочники
 */
@Entity
@Table(name = "lib_items")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class LibraryItem {

    @NotNull(groups = OnUpdate.class)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "categoryId", referencedColumnName = "id")
    private Category category;

    @NotNull
    @Column(name = "title")
    @Size(min = 2, max = 80)
    private String title = "";

    @NotNull
    @Size(min = 2, max = 80, groups = {Book.class, ReferenceBook.class})
    @Column(name = "author")
    private String author = "";

    @Min(value = 1, groups = {Book.class, ReferenceBook.class})
    @Max(value = 0, groups = {Dvd.class, AudioBook.class})
    @Column(name = "pages")
    private Integer pages = 0;

    @Null(groups = {Book.class, ReferenceBook.class})
    @Min(value = 2, groups = {Dvd.class, AudioBook.class})
    @Column(name = "run_time_minutes")
    private Integer runTimeMinutes;

    @Column(name = "is_borrowable")
    @org.hibernate.annotations.ColumnDefault("1")
    private Boolean isBorrowable = true;

    @Size(max = 0, groups = ReferenceBook.class)
    @Column(name = "borrower")
    private String borrower = "";

    @Null(groups = ReferenceBook.class)
    @Column(name = "borrow_date")
    private Date borrowDate;

    @NotNull
    @Column(name = "type")
    private String type = "book";

    public LibraryItem(Category category, String title, String author, Integer pages, Integer runTimeMinutes, String type) {
        this.category = category;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.runTimeMinutes = runTimeMinutes;
        this.type = type;
    }

    public LibraryItem() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Date getBorrowDate() {
        return borrowDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public void setIsBorrowable(Boolean borrowable) {
        isBorrowable = borrowable;
    }

    public Boolean isBorrowable() {
        return isBorrowable;
    }

    public Integer getRunTimeMinutes() {
        return runTimeMinutes;
    }

    public void setRunTimeMinutes(Integer runTimeMinutes) {
        this.runTimeMinutes = runTimeMinutes;
    }

    public String getBorrower() {
        return borrower;
    }

    public void setBorrower(String borrower) {
        this.borrower = borrower;
    }

    public void setBorrowDate(Date borrowDate) {
        this.borrowDate = borrowDate;
    }

    @JsonGetter("category")
    public String getCategory() {
        return category.getCategoryName();
    }

    @JsonSetter("category")
    public void setCategory(String name) {
        category = new Category(name);
    }

}
