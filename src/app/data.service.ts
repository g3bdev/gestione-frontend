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


  getMyReports(limit: number) {
    return this.httpClient.get(`${environment.apiUrl}/me/reports?limit=${limit}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getUsers() {
    return this.httpClient.get(`${environment.apiUrl}/users`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getOperators() {
    return this.httpClient.get(`${environment.apiUrl}/operators`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getReports(limit: number) {
    return this.httpClient.get(`${environment.apiUrl}/reports?limit=${limit}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getReportById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/report/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getPlantsByClient(client_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/plant?client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }


  getMachineByPlant(plant_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/machine?plant_id=${plant_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMonthlyReports(client_id: string, month: string, user_id: string, plant_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/monthly?month=${month}&user_id=${user_id}&client_id=${client_id}&plant_id=${plant_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMonthlyCommissionReports(client_id: string, month: string, user_id: string, commission_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/monthly/commissions?month=${month}&user_id=${user_id}&client_id=${client_id}&work_id=${commission_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getIntervalReports(client_id: string, user_id: string, start_date: string, end_date: string, plant_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/interval?start_date=${start_date}&end_date=${end_date}&user_id=${user_id}&client_id=${client_id}&plant_id=${plant_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getIntervalCommissionReports(client_id: string, user_id: string, start_date: string, end_date: string, plant_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/interval/commissions?start_date=${start_date}&end_date=${end_date}&user_id=${user_id}&client_id=${client_id}&plant_id=${plant_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getDailyHours(user_id: string, month: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/daily?user_id=${user_id}&month=${month}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getLocations() {
    return this.httpClient.get(`${environment.apiUrl}/locations`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getClients() {
    return this.httpClient.get(`${environment.apiUrl}/clients`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getCommissions() {
    return this.httpClient.get(`${environment.apiUrl}/commissions`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getOpenCommissions() {
    return this.httpClient.get(`${environment.apiUrl}/commissions/open`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getInterventionTypes() {
    return this.httpClient.get(`${environment.apiUrl}/intervention_types`);
  }

  getRoles() {
    return this.httpClient.get(`${environment.apiUrl}/roles`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getPlants() {
    return this.httpClient.get(`${environment.apiUrl}/plants`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMachines(limit: number) {
    return this.httpClient.get(`${environment.apiUrl}/machines?limit=${limit}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMonths(user_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/months?user_id=${user_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
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
    supervisor_id: string | null;
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
    role_id: string | null;
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
    commission_code: string | null;
    commission_description: string | null;
    client_id: string | null;
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
    supervisor_id: string | null;
    description: string | null;
    notes: string | null;
    trip_kms: string | null;
    cost: string | null;
  }>, report_id: number, user_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/report/edit?report_id=${report_id}&user_id=${user_id}`, report, {
      headers: new HttpHeaders().set("Content-Type", "application/json").set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  editMachine(machine: Partial<{
    client_id: string | null;
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
  }>, machine_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/machine/edit?machine_id=${machine_id}`, machine, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  editClient(client: Partial<{
    name: string | null;
    city: string | null;
    province: string | null;
    cap: string | null;
    address: string | null;
    email: string | null;
    contact: string | null;
    phone_number: string | null;
  }>, client_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/client/edit?client_id=${client_id}`, client, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  editPlant(plant: Partial<{
    client_id: string | null;
    name: string | null;
    city: string | null;
    province: string | null;
    cap: string | null;
    address: string | null;
    email: string | null;
    contact: string | null;
    phone_number: string | null;
  }>, plant_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/plant/edit?plant_id=${plant_id}`, plant, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  editCommission(commission: Partial<{
    commission_code: string | null;
    commission_description: string | null;
    client_id: string | null;
  }>, commission_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/commission/edit?commission_id=${commission_id}`, commission, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getUserById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/user/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getClientById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/client/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getPlantById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/plant/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getCommissionById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/commission/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getMachineById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/machine/${id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
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

  printMonthlyReports(client_id: string, month: string, user_id: string, plant_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/monthly/pdf?month=${month}&user_id=${user_id}&client_id=${client_id}&plant_id=${plant_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  printMonthlyCommissionReports(client_id: string, month: string, user_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/monthly/pdf?month=${month}&user_id=${user_id}&client_id=${client_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  printIntervalReports(client_id: string, start_date: string, end_date: string, user_id: string, plant_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/interval/pdf?start_date=${start_date}&end_date=${end_date}&user_id=${user_id}&client_id=${client_id}&plant_id=${plant_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  printIntervalCommissionReports(client_id: string, start_date: string, end_date: string, user_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/interval/commissions/pdf?start_date=${start_date}&end_date=${end_date}&user_id=${user_id}&client_id=${client_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  printCsvMonthlyReports(client_id: string, month: string, user_id: string, plant_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/monthly/csv?month=${month}&user_id=${user_id}&client_id=${client_id}&plant_id=${plant_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  printCsvMonthlyCommissionReports(client_id: string, month: string, user_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/monthly/commissions/csv?month=${month}&user_id=${user_id}&client_id=${client_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  printCsvIntervalReports(client_id: string, start_date: string, end_date: string, user_id: string, plant_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/interval/csv?start_date=${start_date}&end_date=${end_date}&user_id=${user_id}&client_id=${client_id}&plant_id=${plant_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  printCsvIntervalCommissionReports(client_id: string, start_date: string, end_date: string, user_id: string, work_id: string) {
    return this.httpClient.get(`${environment.apiUrl}/reports/interval/commissions/csv?start_date=${start_date}&end_date=${end_date}&user_id=${user_id}&client_id=${client_id}&work_id=${work_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  getCommissionsByClient(client_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/commissions?client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getOpenCommissionsByClient(client_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/commissions/open?client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  changePassword(old_password: string, new_password: string) {
    return this.httpClient.put(`${environment.apiUrl}/change-password`, {
      old_password,
      new_password
    }, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  editUser(user: Partial<{
    email: string | null;
    phone_number: string | null;
    client_id: string | null;
  }>, user_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/user/edit?user_id=${user_id}`, user, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${environment.apiUrl}/upload-xml`, formData, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`), responseType: 'blob'
    });
  }

  getSupervisorsByClient(client_id: number) {
    return this.httpClient.get(`${environment.apiUrl}/supervisors?client_id=${client_id}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  resetPassword(user_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/reset-password?user_id=${user_id}`, {}, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  sendEmail(report_id: number, report: File, supervisor_email: string) {
    const formData = new FormData();
    formData.append('file', report);
    formData.append('email', supervisor_email);
    return this.httpClient.post(`${environment.apiUrl}/send-email?report_id=${report_id}`, formData, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  closeCommission(commission_id: number) {
    return this.httpClient.put(`${environment.apiUrl}/commission/close?commission_id=${commission_id}`, {}, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }
}
