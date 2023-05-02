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
  work = [];
  sites = [];
  intervention_types = [];
  intervention_locations = [];
  users = [];
  message = '';
  logged_role = localStorage.getItem('role');

  form = this.formBuilder.group({
    date: ['', Validators.required],
    intervention_duration: ['', [Validators.pattern(/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/), Validators.required]],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client_id: ['', Validators.required],
    site_id: ['', Validators.required],
    supervisor: [''],
    description: [''],
    notes: [''],
    trip_kms: [''],
    cost: [''],
    operator_id: ['']
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
    })
  }

  ngOnInit(): void {
    this.dataService.getCommissions().subscribe((data: any) => {
      this.sites = data;
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
      client_id: undefined,
      date: this.data.message['Work']['date'],
      intervention_duration: this.data.message['Work']['intervention_duration'],
      intervention_type: this.data.message['Work']['intervention_type'],
      supervisor: this.data.message['Work']['supervisor'],
      intervention_location: this.data.message['Work']['intervention_location'],
      site_id: this.data.message['Work']['site_id'],
      description: this.data.message['Work']['description'],
      notes: this.data.message['Work']['notes'],
      trip_kms: this.data.message['Work']['trip_kms'],
      cost: this.data.message['Work']['cost'],
      operator_id: this.data.message['Work']['operator_id']
    });
  }

  openSnackBar() {
    this.snackBar.open('Intervento modificato con successo!', '', {
      duration: this.duration * 1000,
    });
  }

  onConfirm() {
    this.dataService.editReport(this.form.value, this.data.message['Work']['id'], +this.form.get('operator_id')!.value!).subscribe({
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

