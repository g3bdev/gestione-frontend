import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.loginForm.value.username!);
    formData.append('password', this.loginForm.value.password!);
    this.authService.getToken(formData).subscribe({
      next: (data: any) => {
        this.authService.login(data.access_token);
      },
      error: (error) => {
        this.errorMessage = error.error.detail;
      }
    });
  }

  ngOnInit(): void {
  }

}
