package ps.technolab.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ps.technolab.backend.dto.StatusMessage;
import ps.technolab.backend.entity.Clients;
import ps.technolab.backend.repository.ClientsRepository;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class ClientsService {

    @Autowired
    private ClientsRepository clientsRepository;


    public List<Clients> getAllClients() {
        return clientsRepository.findAll();
    }

    public Optional<Clients> getClientById(Long id) {
        return clientsRepository.findById(id);
    }

    @Transactional
    public StatusMessage addClient(Clients client) {
        try {
            if (clientsRepository.existsByName(client.getName())) {
                return new StatusMessage("exists", clientsRepository.findByName(client.getName()), null);
            }

            if (client.getName() == null) {
                return new StatusMessage("fail", "name must be not null", null);
            }
          if(client.getPhone()==null){
              return new StatusMessage("fail", "phone must be not null", null);
          }

            client.setCreatedAt(OffsetDateTime.now(ZoneId.of("Asia/Gaza")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            Clients addedClient = clientsRepository.save(client);
            return new StatusMessage("success", addedClient, null);

        } catch (DataIntegrityViolationException ex) {
            String errorMessage = "Failed to add client Name or phone already exsist.";
            return new StatusMessage("fail", errorMessage, null);
        }
    }

    public boolean deleteClientById(Long id) {
        // Check if the client exists
        if (clientsRepository.existsById(id)) {
            clientsRepository.deleteById(id);
            return true; // Client deleted successfully
        } else {
            return false; // Client with the specified ID does not exist
        }
    }
}
