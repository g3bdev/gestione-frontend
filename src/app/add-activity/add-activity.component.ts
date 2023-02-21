import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

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

  ngOnInit(): void {
    this.dataService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
    this.dataService.getSites().subscribe((data: any) => {
      this.sites = data;
    });
    this.dataService.getWorkTable().subscribe((data: any) => {
      this.work = data;
    });
  }
}
