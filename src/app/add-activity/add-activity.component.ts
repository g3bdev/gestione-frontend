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
  intervention_types = ['installation', 'scheduled_maintenance', 'extraordinary_maintenance', 'remote_support', 'programming', 'training', 'planning', 'assembly', 'testing', 'other'];
  intervention_locations = ['ITW', 'client', 'remote'];
  work = [];
  operators = [];

  select(event: Event, value: string) {
    this.newActivityForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
  }

  newActivityForm = this.formBuilder.group({
    date: ['', Validators.required],
    intervention_duration: ['', [Validators.pattern(/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), Validators.required]],
    intervention_type: ['installation', Validators.required],
    intervention_location: ['ITW', Validators.required],
    client: ['ITW', Validators.required],
    site: ['', Validators.required],
    description: [''],
    notes: [''],
    trip_kms: ['0'],
    cost: ['0'],
    operator_id: [''],
  });

  submitForm() {
    this.dataService.sendActivity(this.newActivityForm.value).subscribe(data => {
      console.log(data);
    });
  }

  error: any;
  isError = true;
  // loading$ = new BehaviorSubject<boolean>(true);
  private getClientsSubscription: Subscription | null = null;
  private getSitesSubscription: Subscription | null = null;
  private getWorkTableSubscription: Subscription | null = null;


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
        this.getWorkTableSubscription = this.dataService.getWorkTable().subscribe((data: any) => {
          this.work = data;
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
    if (this.getWorkTableSubscription) {
      this.getWorkTableSubscription.unsubscribe();
    }
  }
}
