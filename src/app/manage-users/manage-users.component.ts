import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {AuthService} from "../auth.service";
import {
  faAddressBook,
  faArrowLeft,
  faAt,
  faBuilding,
  faEnvelope,
  faPhone,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {CommonService} from "../common.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users = [];
  clients = [];
  first_name = '';
  last_name = '';
  email = '';
  username = '';
  phone_number = '';
  role = '';
  user_id = '';
  client_id = '';
  client_name = '';
  client_city = '';
  logged_role = localStorage.getItem('role');
  fa_arrowLeft = faArrowLeft;
  fa_user = faUser;
  fa_envelope = faEnvelope;
  fa_at = faAt;
  fa_phone = faPhone;
  fa_building = faBuilding;
  fa_address = faAddressBook;
  fa_user_size: SizeProp = "2xl";
  clicked = false;
  error = false;
  editing = false;
  message = '';

  constructor(private dataService: DataService, private authService: AuthService, private dialog: MatDialog, private common: CommonService, private formBuilder: FormBuilder) {
  }

  editUserForm = this.formBuilder.group({
    user_id: ['', Validators.required],
    email: ['', Validators.required],
    phone_number: ['', Validators.required],
    client_id: ['', Validators.required]
  });

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
        this.error = false;
        this.message = '';
        this.dataService.getUserById(+this.editUserForm.value.user_id!).subscribe({
          next: (data: any) => {
            this.role = data.role;
            this.client_name = data.client_name;
            this.client_city = data.client_city;
          }
        });
        this.common.openSnackBar('Profilo modificato con successo!');
      },
      error: (error) => {
        this.editing = false;
        this.common.openSnackBar(error.error.detail);
      }
    });
  }

  cancel() {
    this.editing = false;
  }

  select(event: Event, value: string) {
    this.editUserForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    if (value === 'user_id') {
      this.clicked = true;
      this.editing = false;
      this.error = false;
      this.message = '';
      this.dataService.getUserById(+this.editUserForm.value.user_id!).subscribe({
        next: (data: any) => {
          this.first_name = data.User.first_name;
          this.last_name = data.User.last_name;
          this.email = data.User.email;
          this.username = data.User.username;
          this.phone_number = data.User.phone_number;
          this.user_id = data.User.id;
          this.client_id = data.User.client_id;
          this.client_name = data.client_name;
          this.client_city = data.client_city;
          this.role = data.role;
        }
      });
    }
  }

  resetPassword(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        title: 'Conferma reset password',
        message: 'Sei sicuro di voler resettare la password di questo utente?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.resetPassword(id).subscribe({
          next: (data: any) => {
            this.error = false;
            this.message = data.detail + '! La nuova password è: ' + data.password;
          },
          error: (error) => {
            this.error = true;
            this.message = error.error.detail;
          }
        });
      }
    });
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        title: 'Conferma eliminazione',
        message: 'Sei sicuro di voler eliminare questo utente?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteUser(id).subscribe({
          next: (data: any) => {
            this.error = false;
            this.message = data.detail;
          },
          error: (error) => {
            console.log(error)
            this.error = true;
            this.message = error.error.detail;
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.dataService.getClients().subscribe((data: any) => {
        this.clients = data;
      });
    });
  }

  protected readonly window = window;
}
