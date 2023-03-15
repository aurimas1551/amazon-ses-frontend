import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = "https://kvksesbdbe.ngrok.io/api";
  constructor(private httpClient: HttpClient) { }

  postProject(project: Project): Observable<object> {
    return this.httpClient.post(`${this.baseUrl + "/project"}`, project);
  }

  getProjects() {
    return this.httpClient.get(this.baseUrl + "/projects")
  }

  deleteProject(id: number) {
    return this.httpClient.delete(`${this.baseUrl + "/project/" + id}`)
  }

  postResendProject(id: number, project: Project): Observable<object> {
    return this.httpClient.post(`${this.baseUrl + "/project/resend/" + id}`, project);
  }

}
