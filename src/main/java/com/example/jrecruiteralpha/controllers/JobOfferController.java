package com.example.jrecruiteralpha.controllers;

import com.example.jrecruiteralpha.models.Company;
import com.example.jrecruiteralpha.models.JobOffer;
import com.example.jrecruiteralpha.repositories.JobOfferRepository;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class JobOfferController
{
    private final JobOfferRepository jobOfferRepository;

    public JobOfferController(JobOfferRepository jobOfferRepository)
    {
        this.jobOfferRepository = jobOfferRepository;
    }

    @GetMapping("/joboffers/embeded_company/{id}")
    @Transactional
    public Company getCompanyByJobOfferId(@PathVariable Long id) throws Exception
    {
        if(id==null)
        {
            throw new Exception("A spróbuj się wyjebać");
        }
        else
        {
            Optional<JobOffer> jobOfferOptional = jobOfferRepository.findById(id);
            if(jobOfferOptional.isPresent())
            {
                Company company = new Company();
                company.setId(jobOfferOptional.get().getCompany().getId());
                company.setCompanyName(jobOfferOptional.get().getCompany().getCompanyName());
                company.setDescription(jobOfferOptional.get().getCompany().getDescription());
                company.setLocalization(jobOfferOptional.get().getCompany().getLocalization());
                return company;
            }
            else
                return null;
        }
    }
}
