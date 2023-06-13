import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent {
  clients = [];
  plants = [];
  message = '';
  newMachineForm = this.formBuilder.group({
    client_id: ['', Validators.required],
    plant_id: ['', Validators.required],
    name: ['', Validators.required],
    cost_center: [''],
    brand: [''],
    model: [''],
    production_year: [''],
    description: [''],
    robotic_island: [''],
    code: [''],
    serial_number: ['']
  });
  error: any;
  submitted: boolean = false;

  get isClientSelected() {
    return this.newMachineForm.value.client_id !== '';
  }

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  get form() {
    return this.newMachineForm.controls;
  }

  select(event: Event, value: string) {
    this.newMachineForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    if (value === 'client_id') {
      this.newMachineForm.patchValue({
        plant_id: ''
      });
      this.plants = [];
      this.dataService.getPlantsByClient(+this.newMachineForm.value.client_id!).subscribe({
        next: (data: any) => {
          this.plants = data;
        }
      });
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.newMachineForm.invalid) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
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
    this.dataService.getClients().subscribe({
      next: (data: any) => {
        this.clients = data;
      }
    });
    this.dataService.getPlants().subscribe({
      next: (data: any) => {
        this.plants = data;
      }
    });
  }
}
