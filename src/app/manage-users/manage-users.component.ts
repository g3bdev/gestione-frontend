import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {AuthService} from "../auth.service";
import {faAt, faBuilding, faEnvelope, faPhone, faUser} from '@fortawesome/free-solid-svg-icons';
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users = [];
  first_name = '';
  last_name = '';
  email = '';
  username = '';
  phone_number = '';
  role = '';
  selectedID = 0;
  logged_role = localStorage.getItem('role');
  fa_user = faUser;
  fa_envelope = faEnvelope;
  fa_at = faAt;
  fa_phone = faPhone;
  fa_building = faBuilding;
  fa_user_size: SizeProp = "2xl";
  clicked = false;
  message = '';

  constructor(private dataService: DataService, private authService: AuthService) {
  }

  onChange(id: number) {
    this.clicked = true;
    this.message = '';
    this.dataService.getUserById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.username = data.username;
        this.phone_number = data.phone_number;
        this.role = data.role;
        this.selectedID = id;
      }, error: () => {
        this.message = 'Errore durante il caricamento dei dati';
      }
    });
  }

  deleteUser(id: number) {
    this.dataService.deleteUser(id).subscribe({
      next: (data: any) => {
        this.message = 'Utente eliminato con successo!';
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, error: (error) => {
        this.message = error.error.detail;
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data: any) => {
        console.log(data)
        this.logged_role = data.role;
      }
    });
    this.dataService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }


  alert() {
    this.message = 'in costruzione';
  }
}
