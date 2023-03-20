import {Component} from '@angular/core';
import {DataService} from "../data.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {EditComponent} from "../edit/edit.component";
import {faExclamationCircle, faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage-work',
  templateUrl: './manage-work.component.html',
  styleUrls: ['./manage-work.component.css']
})
export class ManageWorkComponent {

  displayed_columns: string[] = ['date', 'duration', 'type', 'location', 'client', 'site', 'actions'];
  sites = [];
  work = [];
  message = '';
  error = '';
  fa_trash = faTrash;
  fa_info = faInfoCircle;
  fa_exclamation_circle = faExclamationCircle;
  fa_size: SizeProp = "xl";
  filterForm = this.formBuilder.group({
    site: ['', Validators.required],
  });

  constructor(private dataService: DataService, private dialog: MatDialog, private formBuilder: FormBuilder) {
  }

  select(event: Event, value: string) {
    const selectedValue = (event.target as HTMLInputElement).value;
    this.filterForm.patchValue({
      [value]: selectedValue
    });
    this.dataService.getSiteWorkById(+selectedValue).subscribe({
      next: (data: any) => {
        console.log(data)
        this.work = data;
        if (this.work.length > 0) {
          this.error = '';
        } else {
          this.error = 'Non ci sono interventi da visualizzare';
        }
      }
    });
  }

  deleteWork(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        data: {
          title: 'Conferma eliminazione',
          message: 'Sei sicuro di voler eliminare questo intervento?'
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteWork(id).subscribe({
          next: (data: any) => {
            this.message = data;
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        });
      }
    });
  }

  editWork(id: number) {
    this.dataService.getWorkById(id).subscribe({
      next: (data: any) => {
        this.dialog.open(EditComponent, {
          data: {
            title: 'Modifica intervento',
            message: data,
            type: 'work'
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getUserWork().subscribe({
      next: (data: any) => {
        this.work = data;
      }
    });
    this.dataService.getSites().subscribe({
      next: (data: any) => {
        console.log(data)
        this.sites = data;
      }
    });
  }
}
