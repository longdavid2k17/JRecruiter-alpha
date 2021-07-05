package com.example.jrecruiteralpha.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "job_offers")
@Getter
@Setter
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
    @JoinColumn(name = "company_id",nullable = false)
    private Company company;

    @NotNull
    @CreatedDate
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    Date creationDate;

    @Override
    public String toString() {
        return "JobOffer{" +
                "id=" + id +
                ", positionTitle='" + positionTitle + '\'' +
                ", positionDescription='" + positionDescription + '\'' +
                ", lowEndPaymentRange=" + lowEndPaymentRange +
                ", highEndPaymentRange=" + highEndPaymentRange +
                ", contractType='" + contractType + '\'' +
                ", company=" + company +
                ", creationDate=" + creationDate +
                '}';
    }
}
