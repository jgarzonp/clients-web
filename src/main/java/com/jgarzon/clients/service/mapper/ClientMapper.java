package com.jgarzon.clients.service.mapper;

import com.jgarzon.clients.domain.Client;
import com.jgarzon.clients.service.dto.ClientDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {

    default Client fromId(Long id) {
        if (id == null) {
            return null;
        }
        Client client = new Client();
        client.setId(id);
        return client;
    }
}
