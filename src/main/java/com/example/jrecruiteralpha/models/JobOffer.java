package com.example.jrecruiteralpha.models;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "job_offers")
@Data
public class JobOffer
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotBlank
    @Size(max = 30)
    String positionTitle;

    @NotBlank
    @Size(max = 1000)
    String positionDescription;
    //List<String> requirements;
    @NotNull
    private Double lowEndPaymentRange;

    @NotNull
    private Double highEndPaymentRange;

    @NotBlank
    @Size(max = 50)
    private String contractType;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @NotNull
    @CreatedDate
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    Date creationDate;
}
