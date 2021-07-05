import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {JobOfferService} from "../services/job-offer.service";
import {JobOffer} from "../common/JobOffer";
import {ActivatedRoute} from "@angular/router";
import {logger} from "codelyzer/util/logger";
import {CompanyServiceService} from "../services/company-service.service";
import {Company} from "../common/Company";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content?: string;
  jobOffers: JobOffer[]=[];
  searchMode: boolean = false;
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  page_size:number=5;

  constructor(private jobOfferService: JobOfferService,private route: ActivatedRoute,private companyService:CompanyServiceService) { }

  ngOnInit(): void
  {
    this.route.paramMap.subscribe(() => {
      this.listOffers();
    });
  }

  listOffers() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode)
    {
      this.handleSearch();
    }
    else
    {
      this.handleList();
    }

  }

  handleSearch() {

    let theKeyword:string | null = this.route.snapshot.paramMap.get('keyword');

    this.jobOfferService.searchOffers(theKeyword).subscribe(
      data => {
        this.jobOffers = data;
      }
    );

  }

  handleList()
  {
    this.jobOfferService.getAllOffers().subscribe(
      data => {
        this.jobOffers = data;
      },
      err =>
      {
        this.content = JSON.parse(err.error).message;
      }
    );
    setTimeout(()=> {
      this.jobOffers.forEach( (element) =>
      {
        this.companyService.getCompanyByJobOfferId(element.id).subscribe(data =>{
          element.company=data;
          console.log(data);
        })
      });
    },100)
  }
}
