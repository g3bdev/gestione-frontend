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


  getMyWork() {
    return this.httpClient.get(`${environment.apiUrl}/me/work`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getUsers() {
    return this.httpClient.get(`${environment.apiUrl}/users`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getWork() {
    return this.httpClient.get(`${environment.apiUrl}/work`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getWorkById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/work/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getUserMonthlyWork(site_id: string, month: string, user_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/work/monthly/?month=${month}&operator_id=${user_id}&site_id=${site_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getUserIntervalWork(site_id: string, start_date: string, end_date: string, user_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/work/interval/?start_date=${start_date}&end_date=${end_date}&operator_id=${user_id}&site_id=${site_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMyMonthlyWork(site_id: string, month: string) {
    return this.httpClient.get(`${environment.apiUrl}/me/work/monthly?month=${month}&site_id=${site_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMyIntervalWork(site_id: string, start_date: string, end_date: string) {
    return this.httpClient.get(`${environment.apiUrl}/me/work/interval?start_date=${start_date}&end_date=${end_date}&site_id=${site_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMySites() {
    return this.httpClient.get(`${environment.apiUrl}/me/sites`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMyMonths(site_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/me/months/?site_id=${site_id}`, {
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

  getMonths(user_id: string, site_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/months/?operator_id=${user_id}&site_id=${site_id}`);
  }

  getUserSites(user_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/sites?user_id=${user_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createWork(work: Partial<{
    date: string | null;
    intervention_duration: string | null;
    intervention_type: string | null;
    intervention_location: string | null;
    site_id: string | null;
    supervisor: string | null;
    description: string | null;
    notes: string | null;
    trip_kms: string | null;
    cost: string | null;
    operator_id: string | null;
  }>) {
    return this.httpClient.post(`${environment.apiUrl}/work/create`, work, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createUser(user: Partial<{
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    email: string | null;
    phone_number: string | null;
    role: string | null;
  }>) {
    return this.httpClient.post(`${environment.apiUrl}/users/create`, user, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createClient(client: Partial<{
    name: string | null;
    city: string | null;
    address: string | null;
    email: string | null;
    contact: string | null;
    phone_number: string | null;
  }>) {
    return this.httpClient.post(`${environment.apiUrl}/clients/create`, client, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createSite(site: Partial<{ site_code: string | null; site_description: string | null; client_id: string | null; }>) {
    return this.httpClient.post(`${environment.apiUrl}/sites/create`, site, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  editWork(work: Partial<{
    date: string | null;
    intervention_duration: string | null;
    intervention_type: string | null;
    intervention_location: string | null;
    client_id: string | null;
    site_id: string | null;
    supervisor: string | null;
    description: string | null;
    notes: string | null;
    trip_kms: string | null;
    cost: string | null;
    operator_id: string | null;
  }>, work_id: number, user_id: number) {
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

  printWork(work_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/work/${work_id}/report`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`),
      responseType: 'blob'
    });
  }
}
