import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
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
  fa_arrowLeft = faArrowLeft;
  logged_role = localStorage.getItem('role');
  newUserForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    role: ['', Validators.required]
  });
  submitted: boolean = false;

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
  }

  get form() {
    return this.newUserForm.controls;
  }

  select(event: Event, value: string) {
    this.newUserForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
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

  protected readonly window = window;
}
