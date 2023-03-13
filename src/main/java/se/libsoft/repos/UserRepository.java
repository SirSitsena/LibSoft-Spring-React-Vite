package se.libsoft.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.libsoft.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findUserByUsername(String name);
}
