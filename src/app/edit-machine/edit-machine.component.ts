import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditComponent} from "../edit/edit.component";

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.css']
})
export class EditMachineComponent implements OnInit {

  clients = [];
  plants = [];
  logged_role = localStorage.getItem('role');
  submitted: boolean = false;

  editMachineForm = this.formBuilder.group({
    client_id: ['', Validators.required],
    plant_id: ['', Validators.required],
    name: ['', Validators.required],
    cost_center: [''],
    brand: [''],
    model: [''],
    production_year: [''],
    description: [''],
    robotic_island: [''],
    code: [''],
    serial_number: ['']
  });

  get isClientSelected() {
    return this.editMachineForm.value.client_id !== '';
  }

  get isFormDirty() {
    return this.editMachineForm.dirty;
  }

  get form() {
    return this.editMachineForm.controls;
  }

  constructor(private dialogRef: MatDialogRef<EditComponent>, private formBuilder: FormBuilder, private dataService: DataService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: {
    title: string;
    message: any
  }) {
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  select(event: Event, value: string) {
    this.editMachineForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    if (value === 'client_id') {
      this.editMachineForm.patchValue({
        plant_id: ''
      });
      this.plants = [];
      this.dataService.getPlantsByClient(+this.editMachineForm.value.client_id!).subscribe({
        next: (data: any) => {
          this.plants = data;
        }
      });
    }
  }

  onConfirm() {
    this.submitted = true;
    if (this.editMachineForm.invalid) {
      return;
    }
    this.dataService.editMachine(this.editMachineForm.value, this.data.message['Machine']['id']).subscribe({
      next: () => {
        this.openSnackBar('Macchina modificata con successo!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }, error: (error) => {
        this.openSnackBar(error.error.detail);
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
      }
    });
    this.editMachineForm.patchValue({
      client_id: this.data.message['Client']['id'],
      plant_id: this.data.message['Machine']['plant_id'],
      name: this.data.message['Machine']['name'],
      cost_center: this.data.message['Machine']['cost_center'],
      brand: this.data.message['Machine']['brand'],
      model: this.data.message['Machine']['model'],
      production_year: this.data.message['Machine']['production_year'],
      description: this.data.message['Machine']['description'],
      robotic_island: this.data.message['Machine']['robotic_island'],
      code: this.data.message['Machine']['code'],
      serial_number: this.data.message['Machine']['serial_number']
    });
    this.dataService.getPlantsByClient(this.data.message['Client']['id']).subscribe({
      next: (data: any) => {
        console.log(data)
        this.plants = data;
      }
    });
  }
}
