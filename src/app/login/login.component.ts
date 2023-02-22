import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  onSubmit() {
    console.log('Submit');
    console.log(this.loginForm.value);
  }

  constructor(private formBuilder: FormBuilder) {
  }

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });


  ngOnInit(): void {
  }

}
