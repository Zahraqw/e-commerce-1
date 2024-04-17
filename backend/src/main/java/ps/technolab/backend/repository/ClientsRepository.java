package ps.technolab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.technolab.backend.entity.Clients;

public interface ClientsRepository  extends JpaRepository<Clients,Long> {
    boolean existsByName(String name);

    boolean existsByPhone(String phone);

    Clients findByName(String name);

    Clients findByPhone(String phone);
}
