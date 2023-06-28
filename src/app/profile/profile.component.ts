import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {faAt, faBuilding, faEnvelope, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: []
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private dataService: DataService, private snackBar: MatSnackBar) {
  }

  editUserForm = this.formBuilder.group({
    email: ['', Validators.required],
    phone_number: ['', Validators.required],
    client_id: ['']
  });

  first_name = '';
  last_name = '';
  email = '';
  username = '';
  phone_number = '';
  client = '';
  client_id = '';
  role = localStorage.getItem('role');
  fa_user = faUser;
  fa_envelope = faEnvelope;
  fa_at = faAt;
  fa_phone = faPhone;
  fa_building = faBuilding;
  fa_user_size: SizeProp = "2xl";
  user_id = '';
  editing: boolean = false;

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  write() {
    this.editing = true;
    this.editUserForm.patchValue({
      email: this.email,
      phone_number: this.phone_number,
      client_id: this.client_id
    });
  }

  edit() {
    this.dataService.editUser(this.editUserForm.value, +this.user_id).subscribe({
      next: () => {
        this.editing = false;
        this.authService.getUserInfo().subscribe({
          next: (data: any) => {
            this.email = data.User.email;
            this.phone_number = data.User.phone_number;
            this.client_id = data.User.client_id;
          }
        });
        this.openSnackBar('Profilo modificato con successo!');
      },
      error: (error) => {
        this.editing = false;
        this.openSnackBar(error.error.detail);
      }
    });
  }

  cancel() {
    this.editing = false;
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data: any) => {
        this.first_name = data.User.first_name;
        this.last_name = data.User.last_name;
        this.email = data.User.email;
        this.username = data.User.username;
        this.phone_number = data.User.phone_number;
        this.user_id = data.User.id;
        this.client = data.client_name + ' ' + data.client_city;
        this.client_id = data.User.client_id;
      }
    });
  }
}
