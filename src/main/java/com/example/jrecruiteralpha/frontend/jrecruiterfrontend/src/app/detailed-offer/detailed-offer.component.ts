import { Component, OnInit } from '@angular/core';
import {JobOffer} from "../common/JobOffer";
import {JobOfferService} from "../services/job-offer.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detailed-offer',
  templateUrl: './detailed-offer.component.html',
  styleUrls: ['./detailed-offer.component.css']
})
export class DetailedOfferComponent implements OnInit {

  offer:JobOffer = new JobOffer();

  constructor(private jobOfferService:JobOfferService, private route:ActivatedRoute) { }

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
  }



}
