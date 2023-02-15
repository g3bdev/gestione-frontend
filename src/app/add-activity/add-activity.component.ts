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

  onSelect(event: Event) {
    this.newActivityForm.patchValue({
      client: (event.target as HTMLInputElement).value
    })
  }

  newActivityForm = this.formBuilder.group({
    date: ['', Validators.required],
    intervention_duration: ['', Validators.required],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client: ['ITW', Validators.required],
    site: ['', Validators.required],
    description: ['', Validators.required],
    notes: ['', Validators.required],
    trip_kms: ['', Validators.required],
    cost: ['', Validators.required],
    operator_id: ['', Validators.required],
  });

  submitForm() {
    this.dataService.sendActivity(this.newActivityForm.value).subscribe((data: any) => {
      console.log(data);
    });
  }


  ngOnInit(): void {
    this.dataService.getClients().subscribe((data: any) => {
      console.log(data);
      this.clients = data;
    });
  }

}
