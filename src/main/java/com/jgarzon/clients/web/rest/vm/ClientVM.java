package com.jgarzon.clients.web.rest.vm;

import com.jgarzon.clients.domain.Client;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;

import java.io.Serializable;

import static com.jgarzon.clients.repository.ClientRepository.Specifications.sharedKey;

/**
 * A Client VM
 */
@SuppressWarnings("deprecation")
public class ClientVM implements Serializable {

    /**
     * Filter by Shared Key
     */
    private String sharedKey;

    public String getSharedKey() {
        return sharedKey;
    }

    public void setSharedKey(String sharedKey) {
        this.sharedKey = sharedKey;
    }

    public Specification<Client> specification() {
        Specification<Client> specification = null;
        if (ObjectUtils.anyNotNull(this.sharedKey)) {
            specification = Specifications.where(null);
            if (this.sharedKey != null) {
                specification = specification.and(sharedKey(this.sharedKey));
            }
        }
        return specification;
    }

}
