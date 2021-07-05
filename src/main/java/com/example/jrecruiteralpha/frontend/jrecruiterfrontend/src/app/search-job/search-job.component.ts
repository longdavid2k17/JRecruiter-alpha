import { Component, OnInit } from '@angular/core';
import {CompanyServiceService} from "../services/company-service.service";
import {Company} from "../common/Company";
import {JobOfferService} from "../services/job-offer.service";
import {JobOffer} from "../common/JobOffer";

@Component({
  selector: 'app-search-job',
  templateUrl: './search-job.component.html',
  styleUrls: ['./search-job.component.css']
})
export class SearchJobComponent implements OnInit {

  companies!:Company[];
  jobOffers!:JobOffer[];
  thePageNumber: number = 1;
  thePageSize: any = 10;
  theTotalElements: number = 0;

  constructor(private companyService:CompanyServiceService, private jobofferservice:JobOfferService) { }

  ngOnInit(): void
  {
    this.listCompanies();
    this.listOffers();
  }

  listCompanies()
  {
    this.companyService.getAllCompanies().subscribe(data =>
    {
      this.companies = data;
    });
  }

  updatePageSize(event:Event)
  {
    this.thePageSize = (<HTMLInputElement>event.target).value;
    this.thePageNumber = 1;
    this.listOffers();
  }

  listOffers()
  {
    this.jobofferservice.getJobOffersPaginate(this.thePageNumber - 1,
      this.thePageSize,)
      .subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.jobOffers = data._embedded.joboffers;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
