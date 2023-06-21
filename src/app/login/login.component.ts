import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  submitted: boolean = false;
  attempts = 0;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('username', this.loginForm.value.username!);
    formData.append('password', this.loginForm.value.password!);
    this.authService.getToken(formData).subscribe({
      next: (data: any) => {
        this.authService.login(data.access_token);
      },
      error: (error) => {
        this.attempts++;
        this.errorMessage = error.error.detail;
      }
    });
  }
}
