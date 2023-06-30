import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: any;
  isError = true;
  message = '';
  error_message = '';
  password = '';
  roles = [];
  clients = [];
  fa_arrowLeft = faArrowLeft;
  logged_role = localStorage.getItem('role');
  newUserForm = this.formBuilder.group({
    role_id: ['', Validators.required],
    client_id: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });
  is_operator = false;
  is_admin = false;
  submitted: boolean = false;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
  }


  get form() {
    return this.newUserForm.controls;
  }

  select(event: Event, value: string) {
    this.newUserForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    this.is_operator = value === 'role_id' && this.newUserForm.value.role_id === '2';
    this.is_admin = value === 'role_id' && this.newUserForm.value.role_id === '1';
    if (this.is_operator || this.is_admin) {
      this.newUserForm.patchValue({
        client_id: '8' // move automation ID
      });
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.newUserForm.invalid) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    this.dataService.createUser(this.newUserForm.value).subscribe({
      next: (data) => {
        this.user = data;
        this.password = this.user['temp_password'];
        this.message = 'Utente aggiunto con successo!';
        this.error_message = '';
        window.scrollTo({top: document.documentElement.scrollHeight, behavior: 'smooth'});
      },
      error: (e) => {
        this.message = '';
        this.error_message = e.error.detail;
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getRoles().subscribe({
      next: (data: any) => {
        this.roles = data;
        this.dataService.getClients().subscribe({
          next: (data: any) => {
            this.clients = data;
          }
        });
      }, error: () => {
        this.isError = true;
      }
    });
  }

  protected readonly window = window;
}
