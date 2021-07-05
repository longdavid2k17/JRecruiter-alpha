package com.example.jrecruiteralpha.repositories;

import com.example.jrecruiteralpha.models.Company;
import com.example.jrecruiteralpha.models.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "companies",path = "companies")
@CrossOrigin(origins = "*")
public interface CompanyRepository extends JpaRepository<Company,Long>
{
    Company getCompanyById(Long id);

    Company findByJobOffersContains(JobOffer jobOffer);
}
