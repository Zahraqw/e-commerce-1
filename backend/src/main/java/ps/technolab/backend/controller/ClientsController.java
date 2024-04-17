package ps.technolab.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ps.technolab.backend.dto.StatusMessage;
import ps.technolab.backend.entity.Clients;
import ps.technolab.backend.service.ClientsService;

import java.util.List;
import java.util.Optional;

@RestController
public class ClientsController {

    @Autowired
    private  ClientsService clientsService;

    @GetMapping("/get_all_clients")
    public List<Clients> getAllClients() {

        return clientsService.getAllClients();
    }

    @GetMapping("/get_client_by_id")
    public StatusMessage getClientById(@RequestParam Long id) {
        try {
            Optional<Clients> client = clientsService.getClientById(id);
            if (client.isPresent()) {
                return new StatusMessage("success", client.get(),null);

            } else {
                return new StatusMessage("fail", "Client with ID " + id + " does not exist",null);

            }
        } catch (Exception e) {
          return new StatusMessage("fail","INTERNAL_SERVER_ERROR", null);

        }
    }


    @PostMapping("/add_client")
    public StatusMessage addClient(@RequestBody Clients client) {
       return clientsService.addClient(client);
    }

@DeleteMapping("/delete_client_by_id")
public StatusMessage deleteClientById(@RequestParam Long id) {
    try {
        boolean deleted = clientsService.deleteClientById(id);
        if (deleted) {
            return new StatusMessage("success", "Client with ID " + id + " deleted", null);

        } else {
            return new StatusMessage("fail", "Client with ID " + id + " does not exist", null);

        }
    } catch (Exception e) {
        return new StatusMessage("fail", "Failed to delete client", null);

    }
}
}
