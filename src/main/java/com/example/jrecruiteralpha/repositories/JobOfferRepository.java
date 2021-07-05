package com.example.jrecruiteralpha.repositories;

import com.example.jrecruiteralpha.models.Company;
import com.example.jrecruiteralpha.models.JobOffer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.transaction.Transactional;

@RepositoryRestResource(collectionResourceRel = "joboffers",path = "joboffers")
@CrossOrigin(origins = "*")
public interface JobOfferRepository extends JpaRepository<JobOffer,Long>
{
    JobOffer getById(Long id);
    Page<JobOffer> findAll(Pageable pageable);
    Page<JobOffer> findByPositionTitleContainsOrderByCreationDateDesc(String name, Pageable pageable);
    Page<JobOffer> findAllByContractTypeContains(String type, Pageable pageable);
}
