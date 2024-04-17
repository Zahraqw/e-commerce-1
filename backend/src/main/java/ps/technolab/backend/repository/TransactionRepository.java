package ps.technolab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.technolab.backend.entity.Transactions;

public interface TransactionRepository extends JpaRepository<Transactions, Long> {
    @Override
    void deleteById(Long aLong);
}
