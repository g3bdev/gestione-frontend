import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {

  message = '';
  newClientForm = this.formBuilder.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    cap: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contact: ['', Validators.required],
    phone_number: ['', Validators.required]
  });
  error: any;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  get form() {
    return this.newClientForm.controls;
  }

  select(event: Event, value: string) {
    this.newClientForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
  }

  submitForm() {
    this.submitted = true;
    if (this.newClientForm.invalid) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    this.dataService.createClient(this.newClientForm.value).subscribe({
      next: () => {
        this.message = 'Cliente aggiunto con successo!';
        setTimeout(() => {
          this.router.navigate(['/dashboard']).then();
        }, 2000);
      },
      error: () => {
        this.message = '';
      }
    });
  }

}
