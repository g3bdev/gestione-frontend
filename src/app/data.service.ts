import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any;

  constructor(private httpClient: HttpClient) {
  }

  getUserById(id: number) {
    return this.httpClient.get(`http://localhost:8000/users/${id}?application_name=angular`);
  }

  getUsers() {
    return this.httpClient.get(`http://localhost:8000/users?application_name=angular`);
  }

  getClients() {
    return this.httpClient.get(`http://localhost:8000/clients?application_name=angular`);
  }

  sendActivity(activity: Partial<{ date: string | null; intervention_duration: string | null; intervention_type: string | null; intervention_location: string | null; client: string | null; site: string | null; description: string | null; notes: string | null; trip_kms: string | null; cost: string | null; operator_id: string | null; }>) {
    return this.httpClient.post(`http://localhost:8000/work?application_name=angular`, activity, {
      headers : new HttpHeaders().set("Content-Type","application/json")
    });
  }

}
