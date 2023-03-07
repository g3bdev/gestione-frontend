import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

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
  logged_role = localStorage.getItem('role');
  newUserForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    role: ['', Validators.required]
  });

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
  }

  select(event: Event, value: string) {
    this.newUserForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
  }

  submitForm() {
    this.dataService.createUser(this.newUserForm.value).subscribe({
      next: (data) => {
        this.user = data;
        this.password = this.user['temp_password'];
        this.message = 'Utente aggiunto con successo!';
      },
      error: (e) => {
        this.message = '';
        this.error_message = e.error.detail;
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data: any) => {
        this.logged_role = data.role;
      }
    });
    this.dataService.getRoles().subscribe({
      next: (data: any) => {
        this.roles = data;
      }, error: () => {
        this.isError = true;
      }
    });
  }
}
