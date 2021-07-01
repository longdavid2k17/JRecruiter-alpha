package com.example.jrecruiteralpha.repositories;

import com.example.jrecruiteralpha.models.ERole;
import com.example.jrecruiteralpha.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "roles",path = "roles")
@CrossOrigin(origins = "*")
public interface RoleRepository extends JpaRepository<Role,Long>
{
    Optional<Role> findByName(ERole name);
}
