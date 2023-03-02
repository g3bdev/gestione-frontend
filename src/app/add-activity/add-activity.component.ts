import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService) {
  }

  clients = [];
  sites = [];
  intervention_types = [];
  intervention_locations = ['ITW', 'client', 'remote'];
  operators = [];
  message = '';


  select(event: Event, value: string) {
    this.newActivityForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
  }

  newActivityForm = this.formBuilder.group({
    date: ['', Validators.required],
    intervention_duration: ['', [Validators.pattern(/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), Validators.required]],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client: ['', Validators.required],
    site: ['', Validators.required],
    description: [''],
    notes: [''],
    trip_kms: ['', Validators.required],
    cost: [''],
    operator_id: ['']
  });

  submitForm() {
    this.dataService.sendActivity(this.newActivityForm.value).subscribe({
        next: () => {
          this.message = 'Intervento aggiunto con successo!';
        },
        error: () => {
          this.message = '';
        }
    });
  }

  error: any;
  isError = true;
  private getClientsSubscription: Subscription | null = null;
  private getSitesSubscription: Subscription | null = null;
  private getInterventionTypesSubscription: Subscription | null = null;
  private getWorkSubscription: Subscription | null = null;


  ngOnInit(): void {
    this.dataService.getOk().subscribe({
      next: () => {
        this.isError = false;
        this.getClientsSubscription = this.dataService.getClients().subscribe((data: any) => {
          this.clients = data;
        });
        this.getSitesSubscription = this.dataService.getSites().subscribe((data: any) => {
          this.sites = data;
        });
        this.getInterventionTypesSubscription = this.dataService.getInterventionTypes().subscribe((data: any) => {
          this.intervention_types = data;
        });
      },
      error: (error) => {
        this.isError = true;
        this.error = error;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getClientsSubscription) {
      this.getClientsSubscription.unsubscribe();
    }
    if (this.getSitesSubscription) {
      this.getSitesSubscription.unsubscribe();
    }
    if (this.getInterventionTypesSubscription) {
      this.getInterventionTypesSubscription.unsubscribe();
    }
    if (this.getWorkSubscription) {
      this.getWorkSubscription.unsubscribe();
    }
  }
}
