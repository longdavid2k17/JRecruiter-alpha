package com.example.jrecruiteralpha.services;

import com.example.jrecruiteralpha.models.JobOffer;
import com.example.jrecruiteralpha.repositories.JobOfferRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Random;

@Service
public class BuildStarterData
{
    private final JobOfferRepository jobOfferRepository;

    public BuildStarterData(JobOfferRepository jobOfferRepository)
    {
        this.jobOfferRepository = jobOfferRepository;
    }

    /*@EventListener(ApplicationReadyEvent.class)
    @Transactional*/
    public void insertStarterData()
    {
        Random random = new Random();
        JobOffer jobOffer1 = new JobOffer();
        jobOffer1.setPositionTitle("JAVA Fullstack Developer");
        jobOffer1.setCreationDate(new Date());
        jobOffer1.setPositionDescription("That is JAVA Fullstack Developer offer description");
        jobOffer1.setLowEndPaymentRange(3500d+random.nextInt(500));
        jobOffer1.setHighEndPaymentRange(6500d+random.nextInt(500));

        jobOfferRepository.save(jobOffer1);
    }
}
