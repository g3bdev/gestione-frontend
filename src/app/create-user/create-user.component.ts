import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private router: Router) {
  }

  user: any;
  isError = true;
  message = '';
  password = '';
  roles = [];


  select(event: Event, value: string) {
    this.newUserForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
  }

  newUserForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    phone_number: ['', Validators.required],
    role: ['', Validators.required]
  });


  submitForm() {
    this.dataService.createUser(this.newUserForm.value).subscribe({
      next: (data) => {
        this.user = data;
        this.password = this.user['temp_password'];
        this.message = 'Utente aggiunto con successo!';
      },
      error: () => {
        this.message = '';
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getRoles().subscribe({
      next: (data: any) => {
        this.roles = data;
      }, error: () => {
        this.isError = true;
      }
    });
  }

}
