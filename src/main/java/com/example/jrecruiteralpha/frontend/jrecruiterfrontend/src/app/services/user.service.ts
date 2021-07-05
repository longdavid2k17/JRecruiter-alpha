import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../common/User";
import {map} from "rxjs/operators";
import {JobOffer} from "../common/JobOffer";

const API_URL = 'http://localhost:8080/api/test/';
const USER_GET_BY_EMAIL_URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUserByEmail(email:string):Observable<User>
  {
    const searchUrl=`http://localhost:8080/users/search/findByEmail?email=${email}`;
    return this.http.get<User>(searchUrl);
  }
}

interface GetResponseUser{
  _embedded:{
    user: User[];
  }

}
