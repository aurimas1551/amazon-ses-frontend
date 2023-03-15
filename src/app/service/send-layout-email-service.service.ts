import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project';

@Injectable({
  providedIn: 'root'
})
export class SendLayoutEmailServiceService {
  private baseUrl = "https://kvksesbdbe.ngrok.io/api";
  constructor(private httpClient: HttpClient) { }

  postSendLayoutEmail(project: Project, id: number): Observable<object> {
    return this.httpClient.post(`${this.baseUrl + "/project/" + id}`, project);
  }

}
