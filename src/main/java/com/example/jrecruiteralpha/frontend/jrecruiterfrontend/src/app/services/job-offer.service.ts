import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobOffer} from "../common/JobOffer";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CompanyServiceService} from "./company-service.service";

@Injectable({
  providedIn: 'root'
})
export class JobOfferService
{
  private baseUrl='http://localhost:8080/joboffers';
  private companiesUrl='http://localhost:8080/companies';

  constructor(private httpClient:HttpClient,private companyService:CompanyServiceService) { }

  getAllOffers():Observable<JobOffer[]>
  {
    return this.getOffers(this.baseUrl);
  }

  searchOffers(theKeyword: any): Observable<JobOffer[]>
  {
    const searchUrl = `${this.baseUrl}/search/findByPositionTitleContainsOrderByCreationDateDesc?name=${theKeyword}`;

    return this.getOffers(searchUrl);
  }

  private getOffers(searchUrl: string): Observable<JobOffer[]>
  {
    return this.httpClient.get<GetResponseJobOffer>(searchUrl).pipe(map(response => response._embedded.joboffers));
  }

  getOffer(offerId: number) :Observable<JobOffer>
  {
    const offerUrl = `${this.baseUrl}/${offerId}`;
    return this.httpClient.get<JobOffer>(offerUrl);
  }

  getJobOffersPaginate(thePage: number,
                         thePageSize: number): Observable<GetResponseJobOffer> {

    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseJobOffer>(searchUrl);
  }
}

interface GetResponseJobOffer
{
  _embedded:
    {
    joboffers: JobOffer[];
  }
}
