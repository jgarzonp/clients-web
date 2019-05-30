package com.jgarzon.clients.service;

import com.jgarzon.clients.domain.Client;
import com.jgarzon.clients.service.dto.ClientDTO;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.jgarzon.clients.domain.Client}.
 */
public interface ClientService {

    /**
     * Save a client.
     *
     * @param clientDTO the entity to save.
     * @return the persisted entity.
     */
    ClientDTO save(ClientDTO clientDTO);

    /**
     * Get all the clients.
     *
     * @param specification Spring Data specification to manage the filters to query the records
     * @return the list of entities.
     */
    List<ClientDTO> findAll(Specification<Client> specification);

    /**
     * Get the "id" client.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ClientDTO> findOne(Long id);

    /**
     * Delete the "id" client.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
