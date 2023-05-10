import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-plant',
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.css']
})
export class CreatePlantComponent implements OnInit {
  clients = [];
  message = '';
  newPlantForm = this.formBuilder.group({
    client_id: ['', Validators.required],
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

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  select(event: Event, value: string) {
    this.newPlantForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
  }

  submitForm() {
    this.dataService.createPlant(this.newPlantForm.value).subscribe({
      next: () => {
        this.message = 'Stabilimento aggiunto con successo!';
        setTimeout(() => {
          this.router.navigate(['/dashboard']).then();
        }, 2000);
      },
      error: () => {
        this.message = '';
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getClients().subscribe({
      next: (data: any) => {
        this.clients = data;
      }
    });
  }
}
