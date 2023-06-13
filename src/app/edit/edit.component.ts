import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit', templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  report = [];
  commissions = [];
  clients = [];
  plants = [];
  intervention_types = [];
  machines = [];
  intervention_locations = [];
  users = [];
  message = '';
  logged_role = localStorage.getItem('role');

  editForm = this.formBuilder.group({
    operator_id: ['', Validators.required],
    date: ['', Validators.required],
    intervention_duration: ['', Validators.required],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client_id: ['', Validators.required],
    plant_id: [''],
    work_id: ['', Validators.required],
    type: ['', Validators.required],
    supervisor: ['', Validators.required],
    description: ['', Validators.required],
    notes: [''],
    trip_kms: [''],
    cost: ['']
  });
  duration = 5;
  today = new Date().toISOString().substring(0, 10);

  error: any;
  submitted: boolean = false;
  duration_error = '';

  constructor(private dialogRef: MatDialogRef<EditComponent>, private formBuilder: FormBuilder, private dataService: DataService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: {
    title: string;
    message: any
  }) {
  }

  get isMachine() {
    return this.editForm.value.type === 'machine';
  }

  get form() {
    return this.editForm.controls;
  }

  isDurationValid(value: string): boolean {
    if (value === '') {
      this.duration_error = 'Questo campo è obbligatorio.';
      return false;
    }
    if (parseFloat(value) > 16 || value.endsWith('.')) {
      this.duration_error = 'La durata non è valida.';
      return false;
    }
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(value) || value.startsWith('.')) {
      this.duration_error = 'La durata può contenere solo numeri e un punto.';
      return false;
    }
    return true;
  }

  select(event: Event, value: string) {
    this.editForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    if (value === 'client_id') {
      this.dataService.getPlantsByClient(+this.editForm.value.client_id!).subscribe({
        next: (data: any) => {
          this.plants = data;
        }
      });
      this.dataService.getCommissionsByClient(+this.editForm.value.client_id!).subscribe({
        next: (data: any) => {
          this.commissions = data;
        }
      });
      this.editForm.patchValue({
        plant_id: '0'
      });
    }
    if (value === 'plant_id' && this.editForm.value.plant_id === '0') {
      this.editForm.patchValue({
        type: 'commission'
      });
      this.dataService.getCommissionsByClient(+this.editForm.value.client_id!).subscribe({
        next: (data: any) => {
          this.commissions = data;
        }
      });
    } else if (value === 'plant_id' && this.editForm.value.plant_id !== '0') {
      this.editForm.patchValue({
        type: 'machine', work_id: ''
      });
      this.dataService.getMachineByPlant(+this.editForm.value.plant_id!).subscribe({
        next: (data: any) => {
          this.machines = data;
        }
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: this.duration * 1000
    });
  }

  onConfirm() {
    this.submitted = true;
    if (this.editForm.invalid || !this.isDurationValid(this.editForm.value.intervention_duration!)) {
      return;
    }
    this.dataService.editReport(this.editForm.value, this.data.message['Report']['id'], +this.editForm.value.operator_id!).subscribe({
      next: () => {
        this.openSnackBar('Intervento modificato con successo!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }, error: () => {
        this.openSnackBar('C\'è stato un errore, riprova');
        this.message = '';
      }
    });
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.dataService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
    this.dataService.getInterventionTypes().subscribe((data: any) => {
      this.intervention_types = data;
    });
    this.dataService.getLocations().subscribe((data: any) => {
      this.intervention_locations = data;
    });
    this.dataService.getPlantsByClient(this.data.message['client_id']).subscribe({
      next: (data: any) => {
        this.plants = data;
      }
    });
    if (this.data.message['Report']['type'] === 'machine') {
      this.dataService.getMachineByPlant(this.data.message['plant_id']).subscribe({
        next: (data: any) => {
          this.machines = data;
        }
      });
    } else {
      this.dataService.getCommissionsByClient(this.data.message['client_id']).subscribe({
        next: (data: any) => {
          this.commissions = data;
        }
      });
    }
    if (this.logged_role === 'admin') {
      this.dataService.getUsers().subscribe((data: any) => {
        this.users = data;
      });
    }
    this.editForm.patchValue({
      client_id: this.data.message['client_id'],
      date: this.data.message['Report']['date'],
      type: this.data.message['Report']['type'],
      intervention_duration: this.data.message['Report']['intervention_duration'],
      intervention_type: this.data.message['Report']['intervention_type'],
      supervisor: this.data.message['Report']['supervisor'],
      intervention_location: this.data.message['Report']['intervention_location'],
      description: this.data.message['Report']['description'].trim(),
      notes: this.data.message['Report']['notes'],
      trip_kms: this.data.message['Report']['trip_kms'],
      cost: this.data.message['Report']['cost'],
      operator_id: this.data.message['Report']['operator_id'],
      work_id: this.data.message['Report']['work_id'],
      plant_id: this.data.message['plant_id']
    });
  }
}
