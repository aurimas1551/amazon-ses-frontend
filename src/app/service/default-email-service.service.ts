import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultEmail } from '../default-email';

@Injectable({
  providedIn: 'root'
})
export class DefaultEmailServiceService {
  private baseUrl = "https://kvksesbdbe.ngrok.io/api";
  constructor(private httpClient: HttpClient) { }

  postDefaultEmail(defaultEmail: DefaultEmail): Observable<object> {
    return this.httpClient.post(`${this.baseUrl + "/defaultemail"}`, defaultEmail);
  }

  getDefaultEmails() {
    return this.httpClient.get(this.baseUrl + "/defaultemails");
  }

}
