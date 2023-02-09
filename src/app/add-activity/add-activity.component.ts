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
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    date: ['', Validators.required],
    location: ['', Validators.required]
  });

  submitForm() {
    console.log(this.newActivityForm.value);
  }


  ngOnInit(): void {
  }

}
