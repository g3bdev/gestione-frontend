import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {faArrowLeft, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  fa_arrowLeft = faArrowLeft;
  fa_exclamationTriangle = faExclamationTriangle;
  message = '';
  error = '';
  submitted: boolean = false;

  newPasswordForm = this.formBuilder.group({
    old_password: ['', Validators.required],
    new_password: ['', Validators.required],
    confirm_password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  get form() {
    return this.newPasswordForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.newPasswordForm.invalid) {
      return;
    }
    if (this.newPasswordForm.value.new_password !== this.newPasswordForm.value.confirm_password) {
      this.error = 'Le password non coincidono';
      return;
    }
    this.dataService.changePassword(this.newPasswordForm.value.old_password!, this.newPasswordForm.value.confirm_password!).subscribe({
      next: () => {
        this.error = '';
        this.message = 'Password modificata con successo!';
        setTimeout(() => {
          this.router.navigate(['/profile']).then();
        }, 2000);
      }, error: (error) => {
        this.error = error.error.detail;
      }
    });
  }

  protected readonly window = window;
}
