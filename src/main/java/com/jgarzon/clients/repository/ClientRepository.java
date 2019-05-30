package com.jgarzon.clients.repository;

import com.jgarzon.clients.domain.Client;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Client entity.
 */
@Repository
public interface ClientRepository extends JpaRepository<Client, Long>, JpaSpecificationExecutor<Client> {

    class Specifications {

        public static Specification<Client> sharedKey(String sharedKey) {
            return (root, query, cb) -> cb.equal(cb.upper(root.get("sharedKey")), StringUtils.upperCase(sharedKey));
        }

    }

}
