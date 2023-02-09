import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService) { }

  newActivityForm = this.formBuilder.group({
    date: ['', Validators.required],
    intervention_duration: ['', Validators.required],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client: ['', Validators.required],
    site: ['', Validators.required],
    description: ['', Validators.required],
    notes: ['', Validators.required],
    trip_kms: ['', Validators.required],
    cost: ['', Validators.required],
    operator_id: ['', Validators.required],
  });

  submitForm() {
    this.dataService.sendActivity(JSON.stringify(this.newActivityForm.value)).subscribe((data: any) => {
      console.log(data);
    });
  }


  ngOnInit(): void {
  }

}
