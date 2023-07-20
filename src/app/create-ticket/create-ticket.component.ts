import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  submitted: boolean = false;
  priorities = ['Bassa', 'Media', 'Alta']; // hardcoded but might make a table for it
  ticket_types = ['Guasto', 'Manutenzione', 'Altro']; // hardcoded for now but should be fetched from the backend
  client = [];
  plants = [];
  machines = [];
  logged_role = localStorage.getItem('role');
  newTicketForm = this.formBuilder.group({
    title: ['', Validators.required],
    priority: ['', Validators.required],
    ticket_type: ['', Validators.required],
    plant_id: ['', Validators.required],
    machine_id: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
  }

  get form() {
    return this.newTicketForm.controls;
  }

  get isMachinesEmpty() {
    return this.machines.length === 0;
  }

  select(event: Event, value: string) {
    this.newTicketForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    if (value == 'plant_id' && this.newTicketForm.value.plant_id === '') {
      this.newTicketForm.patchValue({
        machine_id: ''
      });
    }
    if (value == 'plant_id') {
      this.dataService.getMachineByPlant(+this.newTicketForm.value.plant_id!).subscribe({
        next: (data: any) => {
          this.machines = data;
        }
      });
    }
  }

  submitForm() {
    this.submitted = true;
  }

  ngOnInit() {
    this.dataService.getMyClient().subscribe({
      next: (data: any) => {
        console.log(data);
        this.client = data;
        this.dataService.getPlantsByClient(this.client[0]['id']).subscribe({
          next: (data: any) => {
            this.plants = data;
          }
        });
      }
    });
  }
}
