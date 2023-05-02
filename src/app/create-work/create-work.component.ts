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
  newWorkForm = this.formBuilder.group({
    date: [new Date().toISOString().substring(0, 10), Validators.required],
    intervention_duration: ['', [Validators.pattern(/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), Validators.required]],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client_id: ['', Validators.required],
    plant_id: ['0', Validators.required],
    work_id: ['', Validators.required],
    type: [''],
    supervisor: [''],
    description: [''],
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

  get isMachine() {
    return this.newWorkForm.value.plant_id !== '0';
  }

  select(event: Event, value: string) {
    this.newWorkForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    if (value === 'client_id') {
      this.dataService.getPlantByClient(+this.newWorkForm.value.client_id!).subscribe({
        next: (data: any) => {
          console.log(data)
          this.plants = data;
        }
      });
    }
    if (value === 'plant_id') {
      if (this.newWorkForm.value.plant_id === '0') {
        this.newWorkForm.patchValue({
          type: 'commission',
        });
        this.dataService.getCommissionsByClient(+this.newWorkForm.value.client_id!).subscribe({
          next: (data: any) => {
            console.log(data)
            this.commissions = data;
          }
        });
      } else {
        this.newWorkForm.patchValue({
          type: 'machine',
        });
        this.dataService.getMachineByPlant(+this.newWorkForm.value.plant_id!).subscribe({
          next: (data: any) => {
            console.log(data)
            this.machines = data;
          }
        });
      }
    }
  }

  submitForm() {
    this.dataService.createReport(this.newWorkForm.value).subscribe({
      next: () => {
        this.message = 'Intervento aggiunto con successo!';
        if (localStorage.getItem('role') === 'admin') {
          setTimeout(() => {
            this.router.navigate(['/admin/work']).then();
          }, 2000);
        } else {
          setTimeout(() => {
            this.router.navigate(['/work']).then();
          }, 2000);
        }
      }, error: () => {
        this.message = '';
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
    this.dataService.getCommissions().subscribe((data: any) => {
      console.log(data)
      this.commissions = data;
    });
    this.dataService.getInterventionTypes().subscribe((data: any) => {
      this.intervention_types = data;
    });
    this.dataService.getLocations().subscribe((data: any) => {
      this.intervention_locations = data;
    });
  }
}
