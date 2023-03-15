import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: any;

  constructor(private httpClient: HttpClient) {
  }


  getUserWork(sort_by: string = 'date', sort_order: string = 'desc') {
    return this.httpClient.get(`${environment.apiUrl}/users/me/work?sort_by=${sort_by}&sort_order=${sort_order}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getUsers() {
    return this.httpClient.get(`${environment.apiUrl}/users`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getWork(sort_by: string = 'date_created', sort_order: string = 'desc') {
    return this.httpClient.get(`${environment.apiUrl}/work?sort_by=${sort_by}&sort_order=${sort_order}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getWorkById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/work/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getUserById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/user/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getLocations() {
    return this.httpClient.get(`${environment.apiUrl}/locations`);
  }

  getClients() {
    return this.httpClient.get(`${environment.apiUrl}/clients`);
  }

  getSites() {
    return this.httpClient.get(`${environment.apiUrl}/sites`);
  }

  getInterventionTypes() {
    return this.httpClient.get(`${environment.apiUrl}/intervention_types`);
  }

  getRoles() {
    return this.httpClient.get(`${environment.apiUrl}/roles`);
  }

  createWork(work: Partial<{ date: string | null; intervention_duration: string | null; intervention_type: string | null; intervention_location: string | null; client_id: string | null; site_id: string | null; description: string | null; notes: string | null; trip_kms: string | null; cost: string | null; operator_id: string | null; }>) {
    return this.httpClient.post(`${environment.apiUrl}/work/create`, work, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createUser(user: Partial<{ first_name: string | null; last_name: string | null; username: string | null; email: string | null; phone_number: string | null; role: string | null; }>) {
    return this.httpClient.post(`${environment.apiUrl}/users/create`, user, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createClient(client: Partial<{ name: string | null; city: string | null; address: string | null; email: string | null; contact: string | null; phone_number: string | null; }>) {
    return this.httpClient.post(`${environment.apiUrl}/clients/create`, client, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createSite(site: Partial<{ site_code: string | null; site_description: string | null; client_id: string | null; }>) {
    return this.httpClient.post(`${environment.apiUrl}/sites/create`, site, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  editWork(work: Partial<{ date: string | null; intervention_duration: string | null; intervention_type: string | null; intervention_location: string | null; client_id: string | null; site_id: string | null; description: string | null; notes: string | null; trip_kms: string | null; cost: string | null; operator_id: string | null; }>, work_id: number, user_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/work/update?work_id=${work_id}&user_id=${user_id}`, work, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  deleteWork(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/work/delete?work_id=${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/users/delete?user_id=${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  deleteClient(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/clients/delete?client_id=${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  deleteSite(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/sites/delete?site_id=${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }
}
