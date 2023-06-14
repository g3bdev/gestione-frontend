import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EditComponent} from "../edit/edit.component";
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  onConfirm() {
    this.submitted = true;
    if (this.editClientForm.invalid) {
      return;
    }
    this.dataService.editClient(this.editClientForm.value, this.data.message['Machine']['id']).subscribe({
      next: () => {
        this.openSnackBar('Cliente modificato con successo!');
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
    console.log(this.data.message)
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
  }

}
