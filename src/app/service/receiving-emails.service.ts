import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailsList } from '../emails-list';

@Injectable({
  providedIn: 'root'
})
export class ReceivingEmailsService {
  private baseUrl = "https://kvksesbdbe.ngrok.io/api";
  constructor(private httpClient: HttpClient) { }

  postReceivingEmail(emails: EmailsList): Observable<object> {
    return this.httpClient.post(`${this.baseUrl + "/receivingEmail"}`, emails);
  }

  postReceivingEmails(emails: EmailsList): Observable<object> {
    return this.httpClient.post(`${this.baseUrl + "/receivingEmails"}`, emails);
  }

  getReceivingEmails() {
    return this.httpClient.get(this.baseUrl + "/receivingEmails")
  }

  getReceivingEmail(id: number) {
    return this.httpClient.get(this.baseUrl + "/receivingEmails/" + id)
  }

  getReceivingEmailByReceivingEmail(receivingEmail: String) {
    return this.httpClient.get(this.baseUrl + "/receivingEmail/name/" + receivingEmail)
  }

  deleteReceivingEmail(id: number) {
    return this.httpClient.delete(this.baseUrl + "/receivingEmail/" + id)
  }

}
