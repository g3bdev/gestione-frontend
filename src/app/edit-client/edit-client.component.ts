import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EditComponent} from "../edit/edit.component";
import {DataService} from "../data.service";
import {CommonService} from "../common.service";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  clients = [];
  plants = [];
  logged_role = localStorage.getItem('role');
  submitted: boolean = false;

  editClientForm = this.formBuilder.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    contact: ['', Validators.required],
    phone_number: ['', Validators.required],
    province: ['', Validators.required],
    cap: ['', Validators.required],
  });

  get isFormTouched() {
    return this.editClientForm.touched;
  }

  get form() {
    return this.editClientForm.controls;
  }

  constructor(private dialogRef: MatDialogRef<EditComponent>, private formBuilder: FormBuilder, private dataService: DataService, private common: CommonService, @Inject(MAT_DIALOG_DATA) public data: {
    title: string;
    message: any
  }) {
  }

  onConfirm() {
    this.submitted = true;
    if (this.editClientForm.invalid) {
      return;
    }
    this.dataService.editClient(this.editClientForm.value, this.data.message['id']).subscribe({
      next: () => {
        this.common.openSnackBar('Cliente modificato con successo!');
      }, error: (error) => {
        this.common.openSnackBar(error.error.detail);
      }
    });
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    this.dataService.getClients().subscribe({
      next: (data: any) => {
        this.clients = data;
        this.dataService.getPlants().subscribe({
          next: (data: any) => {
            this.plants = data;
          }
        });
      }
    });
    this.editClientForm.patchValue({
      name: this.data.message['name'],
      city: this.data.message['city'],
      address: this.data.message['address'],
      email: this.data.message['email'],
      contact: this.data.message['contact'],
      phone_number: this.data.message['phone_number'],
      province: this.data.message['province'],
      cap: this.data.message['cap'],
    });
  }
}
