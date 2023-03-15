import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutsService {
  private baseUrl = "https://kvksesbdbe.ngrok.io/api";
  constructor(private httpClient: HttpClient) { }

  getTemplates() {
    return this.httpClient.get(this.baseUrl + "/templates");
  }
}
