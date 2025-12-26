package ci.pecheconnect.backend.Repository;

import ci.pecheconnect.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
