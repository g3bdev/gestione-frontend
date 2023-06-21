import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  fa_arrowLeft = faArrowLeft;

  newPasswordForm = this.formBuilder.group({
    old_password: [''],
    new_password: [''],
    confirm_password: ['']
  });

  constructor(private formBuilder: FormBuilder) {
  }

  protected readonly window = window;
}
