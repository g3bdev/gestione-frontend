import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  newPasswordForm = this.formBuilder.group({
    old_password: [''],
    new_password: [''],
    confirm_password: ['']
  });

  constructor(private formBuilder: FormBuilder) {
  }

}
