import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseUrl = "https://kvksesbdbe.ngrok.io/api";
  constructor(private httpClient: HttpClient) { }

  loginUser(user: User): Observable<object> {
    return this.httpClient.post(`${this.baseUrl + "/login"}`, user);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOutUser() {
    sessionStorage.removeItem('username')
  }

}
