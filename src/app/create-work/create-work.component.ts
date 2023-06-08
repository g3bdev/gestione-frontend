import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-work', templateUrl: './create-work.component.html', styleUrls: ['./create-work.component.css']
})
export class CreateWorkComponent implements OnInit {

  clients = [];
  plants = [];
  machines = [];
  commissions = [];
  intervention_types = [];
  intervention_locations = [];
  message = '';
  reportForm = this.formBuilder.group({
    date: [new Date().toISOString().substring(0, 10), Validators.required],
    intervention_duration: ['', Validators.required],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client_id: ['', Validators.required],
    plant_id: ['', Validators.required],
    work_id: ['', Validators.required],
    type: ['', Validators.required],
    supervisor: ['', Validators.required],
    description: ['', Validators.required],
    notes: [''],
    trip_kms: [''],
    cost: ['']
  });
  error: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  get isMachinesEmpty() {
    return this.machines.length === 0;
  }

  get isCommissionsEmpty() {
    return this.commissions.length === 0;
  }

  get isClientSelected() {
    return this.reportForm.value.client_id !== '';
  }

  get isMachine() {
    return this.reportForm.value.plant_id !== 'c';
  }

  select(event: Event, value: string) {
    this.reportForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    if (value === 'client_id') {
      this.dataService.getPlantByClient(+this.reportForm.value.client_id!).subscribe({
        next: (data: any) => {
          this.plants = data;
        }
      });
      this.dataService.getCommissionsByClient(+this.reportForm.value.client_id!).subscribe({
        next: (data: any) => {
          this.commissions = data;
        }
      });
      this.reportForm.patchValue({
        plant_id: 'c',
        work_id: ''
      });
    }
    if (value === 'plant_id') {
      if (this.reportForm.value.plant_id === 'c') {
        this.reportForm.patchValue({
          type: 'commission',
        });
        this.dataService.getCommissionsByClient(+this.reportForm.value.client_id!).subscribe({
          next: (data: any) => {
            this.commissions = data;
          }
        });
      } else {
        this.reportForm.patchValue({
          type: 'machine',
        });
        this.dataService.getMachineByPlant(+this.reportForm.value.plant_id!).subscribe({
          next: (data: any) => {
            this.machines = data;
          }
        });
      }
    }
  }

  submitted: boolean = false;

  submitForm() {
    this.submitted = true;
    if (this.reportForm.invalid) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    this.dataService.createReport(this.reportForm.value).subscribe({
      next: () => {
        this.message = 'Intervento aggiunto con successo!';
        setTimeout(() => {
          this.router.navigate(['/reports']).then();
        }, 2000);
      }, error: () => {
        this.message = '';
      }
    });
  }

  get form() {
    return this.reportForm.controls;
  }

  date_error = '';

  isDurationValid(value: string): boolean {
    if (value === '') {
      this.date_error = 'Questo campo è obbligatorio.';
      return false;
    }
    if (parseFloat(value) > 16 || value.endsWith('.')) {
      this.date_error = 'La durata non è valida.';
      return false;
    }
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(value) || value.startsWith('.')) {
      this.date_error = 'La durata può contenere solo numeri e un punto.';
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.dataService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
    this.dataService.getInterventionTypes().subscribe((data: any) => {
      this.intervention_types = data;
    });
    this.dataService.getLocations().subscribe((data: any) => {
      this.intervention_locations = data;
    });
  }
}
