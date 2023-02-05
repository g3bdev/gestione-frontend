import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

}
