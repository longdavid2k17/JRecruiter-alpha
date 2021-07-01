import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobOffer} from "../common/JobOffer";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobOfferService
{
  private baseUrl='http://localhost:8080/joboffers';

  constructor(private httpClient:HttpClient) { }

  getAllOffers():Observable<JobOffer[]>{
    return this.httpClient.get<GetResponseJobOffer>(this.baseUrl).pipe(map(response=>response._embedded.joboffers))
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
    const productUrl = `${this.baseUrl}/${offerId}`;
    return this.httpClient.get<JobOffer>(productUrl);
  }
}

interface GetResponseJobOffer
{
  _embedded:
    {
    joboffers: JobOffer[];
  }
}
