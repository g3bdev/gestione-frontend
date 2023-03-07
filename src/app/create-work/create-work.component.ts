import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-activity',
  templateUrl: './create-work.component.html',
  styleUrls: ['./create-work.component.css']
})
export class CreateWorkComponent implements OnInit {

  clients = [];
  sites = [];
  intervention_types = [];
  intervention_locations = [];
  operators = [];
  message = '';
  newActivityForm = this.formBuilder.group({
    date: [new Date().toISOString().substring(0, 10), Validators.required],
    intervention_duration: ['', [Validators.pattern(/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), Validators.required]],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client_id: ['', Validators.required],
    site_id: ['', Validators.required],
    description: [''],
    notes: [''],
    trip_kms: [''],
    cost: [''],
    operator_id: ['']
  });
  error: any;
  isError = true;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router) {
  }

  select(event: Event, value: string) {
    this.newActivityForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
  }


  submitForm() {
    this.dataService.sendActivity(this.newActivityForm.value).subscribe({
      next: () => {
        this.message = 'Intervento aggiunto con successo!';
        setTimeout(() => {
          this.router.navigate(['/dashboard']).then();
        }, 2000);
      },
      error: (e) => {
        this.message = '';
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getOk().subscribe({
      next: () => {
        this.isError = false;
        this.dataService.getClients().subscribe((data: any) => {
          this.clients = data;
        });
        this.dataService.getSites().subscribe((data: any) => {
          this.sites = data;
        });
        this.dataService.getInterventionTypes().subscribe((data: any) => {
          this.intervention_types = data;
        });
        this.dataService.getLocations().subscribe((data: any) => {
          this.intervention_locations = data;
        });
      },
      error: (error) => {
        this.isError = true;
        this.error = error;
      }
    });
  }
}
