import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  newActivityForm = this.formBuilder.group({
    date: ['', Validators.required],
    intervention_duration: ['', Validators.required],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client: ['', Validators.required],
    side: ['', Validators.required],
    description: ['', Validators.required],
    notes: ['', Validators.required],
    trip_kms: ['', Validators.required],
    cost: ['', Validators.required],
  });

  submitForm() {
    console.log(this.newActivityForm.value);
  }


  ngOnInit(): void {
  }

}
