import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
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

  form = this.formBuilder.group({
    operator_id: ['', Validators.required],
    date: ['', Validators.required],
    intervention_duration: ['', Validators.required],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client_id: ['', Validators.required],
    plant_id: ['', Validators.required],
    work_id: ['', Validators.required],
    type: ['', Validators.required],
    supervisor: ['', Validators.required],
    description: ['', Validators.required],
    notes: [''],
    trip_kms: [''],
    cost: ['']
  });
  duration = 5;

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: any }
  ) {
  }

  select(event: Event, value: string) {
    this.form.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    if (value === 'client_id') {
      this.dataService.getPlantByClient(+this.form.value.client_id!).subscribe({
        next: (data: any) => {
          this.plants = data;
        }
      });
      this.dataService.getCommissionsByClient(+this.form.value.client_id!).subscribe({
        next: (data: any) => {
          this.commissions = data;
        }
      });
      this.form.patchValue({
        plant_id: '0',
      });
    }
    if (value === 'plant_id') {
      if (this.form.value.plant_id === '0') {
        this.form.patchValue({
          type: 'commission',
        });
        this.dataService.getCommissionsByClient(+this.form.value.client_id!).subscribe({
          next: (data: any) => {
            this.commissions = data;
          }
        });
      } else {
        this.form.patchValue({
          type: 'machine',
        });
        this.dataService.getMachineByPlant(+this.form.value.plant_id!).subscribe({
          next: (data: any) => {
            this.machines = data;
          }
        });
      }
    }
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
    if (this.logged_role === 'admin') {
      this.dataService.getUsers().subscribe((data: any) => {
        this.users = data;
      });
    }

    this.form.patchValue({
      client_id: this.data.message['client_id'],
      date: this.data.message['Report']['date'],
      intervention_duration: this.data.message['Report']['intervention_duration'],
      intervention_type: this.data.message['Report']['intervention_type'],
      supervisor: this.data.message['Report']['supervisor'],
      intervention_location: this.data.message['Report']['intervention_location'],
      description: this.data.message['Report']['description'],
      notes: this.data.message['Report']['notes'],
      trip_kms: this.data.message['Report']['trip_kms'],
      cost: this.data.message['Report']['cost'],
      operator_id: this.data.message['Report']['operator_id'],
      work_id: this.data.message['Report']['work_id'],
      plant_id: this.data.message['Report']['plant_id']
    });
  }

  get isMachinesEmpty() {
    return this.machines.length === 0;
  }

  get isCommissionsEmpty() {
    return this.commissions.length === 0;
  }

  get isMachine() {
    return this.form.value.plant_id !== '0';
  }


  openSnackBar() {
    this.snackBar.open('Intervento modificato con successo!', '', {
      duration: this.duration * 1000,
    });
  }

  onConfirm() {
    this.dataService.editReport(this.form.value, this.data.message['Report']['id'], +this.form.get('operator_id')!.value!).subscribe({
      next: () => {
        this.openSnackBar();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: () => {
        this.message = '';
      }
    });
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

