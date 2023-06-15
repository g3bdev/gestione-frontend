import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EditComponent} from "../edit/edit.component";
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.css']
})
export class EditPlantComponent {
  clients = [];
  logged_role = localStorage.getItem('role');
  submitted: boolean = false;

  editPlantForm = this.formBuilder.group({
    client_id: ['', Validators.required],
    name: [''],
    city: ['', Validators.required],
    province: ['', Validators.required],
    cap: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contact: ['', Validators.required],
    phone_number: ['', Validators.required]
  });

  get isClientSelected() {
    return this.editPlantForm.value.client_id !== '';
  }

  get form() {
    return this.editPlantForm.controls;
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
    this.editPlantForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
  }

  onConfirm() {
    this.submitted = true;
    if (this.editPlantForm.invalid) {
      return;
    }
    this.dataService.editPlant(this.editPlantForm.value, this.data.message['Plant']['id']).subscribe({
      next: () => {
        this.openSnackBar('Stabilimento modificato con successo!');
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

    this.editPlantForm.patchValue({
      client_id: this.data.message['Plant']['client_id'],
      name: this.data.message['Plant']['name'],
      city: this.data.message['Plant']['city'],
      province: this.data.message['Plant']['province'],
      cap: this.data.message['Plant']['cap'],
      address: this.data.message['Plant']['address'],
      email: this.data.message['Plant']['email'],
      contact: this.data.message['Plant']['contact'],
      phone_number: this.data.message['Plant']['phone_number'],
    });
  }
}
