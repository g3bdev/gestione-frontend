import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent {
  plants = [];
  message = '';
  newMachineForm = this.formBuilder.group({
    plant_id: ['', Validators.required],
    name: ['', Validators.required],
    cost_center: ['', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    production_year: ['', Validators.required],
    description: ['', Validators.required],
    robotic_island: ['', Validators.required],
    code: ['', Validators.required],
    serial_number: ['', Validators.required]
  });
  error: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  select(event: Event, value: string) {
    this.newMachineForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
  }

  submitForm() {
    this.dataService.createMachine(this.newMachineForm.value).subscribe({
      next: () => {
        this.message = 'Macchina aggiunta con successo!';
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
    this.dataService.getPlants().subscribe({
      next: (data: any) => {
        this.plants = data;
      }
    });
  }
}
