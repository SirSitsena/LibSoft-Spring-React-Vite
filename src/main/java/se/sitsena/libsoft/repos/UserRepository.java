package se.sitsena.libsoft.repos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.sitsena.libsoft.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findUserByUsername(String name);
}
