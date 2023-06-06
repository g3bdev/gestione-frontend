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


  getMyReports() {
    return this.httpClient.get(`${environment.apiUrl}/me/reports`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getUsers() {
    return this.httpClient.get(`${environment.apiUrl}/users`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getReports() {
    return this.httpClient.get(`${environment.apiUrl}/reports`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getReportById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/report/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getPlantByClient(client_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/plant?client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }


  getMachineByPlant(plant_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/machine?plant_id=${plant_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMonthlyReports(client_id: string, month: string, user_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/monthly?month=${month}&user_id=${user_id}&client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMyMonthlyReports(client_id: string, month: string) {
    return this.httpClient.get(`${environment.apiUrl}/me/reports/monthly?month=${month}&client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getIntervalReports(client_id: string, user_id: string, start_date: string, end_date: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/interval?start_date=${start_date}&end_date=${end_date}&user_id=${user_id}&client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMyIntervalReports(client_id: string, start_date: string, end_date: string) {
    return this.httpClient.get(`${environment.apiUrl}/me/reports/interval?start_date=${start_date}&end_date=${end_date}&client_id=${client_id}`, {
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

  getCommissions() {
    return this.httpClient.get(`${environment.apiUrl}/commissions`);
  }

  getInterventionTypes() {
    return this.httpClient.get(`${environment.apiUrl}/intervention_types`);
  }

  getRoles() {
    return this.httpClient.get(`${environment.apiUrl}/roles`);
  }

  getPlants() {
    return this.httpClient.get(`${environment.apiUrl}/plants`);
  }

  getMachines() {
    return this.httpClient.get(`${environment.apiUrl}/machines`);
  }

  getMonths(user_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/months?user_id=${user_id}`);
  }

  getMyMonths(client_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/me/months?client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createReport(report: Partial<{
    date: string | null;
    intervention_duration: string | null;
    intervention_type: string | null;
    intervention_location: string | null;
    commission_id: string | null;
    supervisor: string | null;
    description: string | null;
    notes: string | null;
    trip_kms: string | null;
    cost: string | null;
    operator_id: string | null;
  }>) {
    return this.httpClient.post(`${environment.apiUrl}/report/create`, report, {
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

  createCommission(commission: Partial<{
    commission_code: string | null; commission_description: string | null; client_id: string | null;
  }>) {
    return this.httpClient.post(`${environment.apiUrl}/commissions/create`, commission, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createPlant(plant: Partial<{
    client_id: string | null;
    name: string | null;
    city: string | null;
    province: string | null;
    cap: string | null;
    address: string | null;
    email: string | null;
    contact: string | null;
    phone_number: string | null;
  }>) {
    return this.httpClient.post(`${environment.apiUrl}/plants/create`, plant, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  createMachine(machine: Partial<{
    plant_id: string | null;
    name: string | null;
    cost_center: string | null;
    brand: string | null;
    model: string | null;
    production_year: string | null;
    description: string | null;
    robotic_island: string | null;
    code: string | null;
    serial_number: string | null;
  }>) {
    return this.httpClient.post(`${environment.apiUrl}/machines/create`, machine, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  editReport(report: Partial<{
    operator_id: string | null;
    date: string | null;
    intervention_duration: string | null;
    intervention_type: string | null;
    intervention_location: string | null;
    client_id: string | null;
    plant_id: string | null;
    work_id: string | null;
    supervisor: string | null;
    description: string | null;
    notes: string | null;
    trip_kms: string | null;
    cost: string | null;
  }>, report_id: number, user_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/report/edit?report_id=${report_id}&user_id=${user_id}`, report, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  deleteReport(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/report/delete?report_id=${id}`, {
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

  deletePlant(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/plants/delete?plant_id=${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  deleteCommission(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/commissions/delete?commission_id=${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  deleteMachine(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/machines/delete?machine_id=${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  printReport(report_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/report/${report_id}/pdf`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  getCommissionsByClient(client_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/commissions?client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }
}
