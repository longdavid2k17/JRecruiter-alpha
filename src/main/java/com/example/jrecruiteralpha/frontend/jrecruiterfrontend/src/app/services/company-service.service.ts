import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../common/Company";
import {map} from "rxjs/operators";

const API_URL = 'http://localhost:8080/companies';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  private companyUrl = 'http://localhost:8080/companies';

  constructor(private http:HttpClient) { }

  getCompanyById(id:number):Observable<Company>
  {
    const searchUrl=`${API_URL}/search/getCompanyById?id=${id}`;
    return this.http.get<Company>(searchUrl);
  }

  getCompanyByJobOfferId(id:number):Observable<Company>
  {
    const searchUrl=`http://localhost:8080/joboffers/embeded_company/${id}`;
    return this.http.get<Company>(searchUrl);
  }

  getAllCompanies():Observable<Company[]>
  {
    return this.http.get<GetResponseCompany>(this.companyUrl).pipe(
      map(response => response._embedded.companies)
    );
  }
}

interface GetResponseCompany
{
  _embedded:
    {
    companies: Company[];
  }
}
