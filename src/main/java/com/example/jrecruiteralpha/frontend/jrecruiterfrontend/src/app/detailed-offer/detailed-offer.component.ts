import { Component, OnInit } from '@angular/core';
import {JobOffer} from "../common/JobOffer";
import {JobOfferService} from "../services/job-offer.service";
import {ActivatedRoute} from "@angular/router";
import {CompanyServiceService} from "../services/company-service.service";
import {Company} from "../common/Company";

@Component({
  selector: 'app-detailed-offer',
  templateUrl: './detailed-offer.component.html',
  styleUrls: ['./detailed-offer.component.css']
})
export class DetailedOfferComponent implements OnInit {

  company!:Company;
  offer!:JobOffer;

  constructor(private jobOfferService:JobOfferService, private route:ActivatedRoute,private companyService:CompanyServiceService) { }

  ngOnInit(): void
  {
    this.route.paramMap.subscribe(() => {
      this.handleOfferDetails();
    })
  }

  handleOfferDetails()
  {
    let offerId: number;
    // @ts-ignore
    offerId = +this.route.snapshot.paramMap.get('id');
    this.jobOfferService.getOffer(offerId).subscribe(
      data => {
        this.offer = data;
      }
    )
    this.companyService.getCompanyByJobOfferId(offerId).subscribe(
      data =>{
        this.company = data;
        console.log(this.company);
      }
    )
  }



}
