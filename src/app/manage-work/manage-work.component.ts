import {Component} from '@angular/core';
import {DataService} from "../data.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {EditComponent} from "../edit/edit.component";

@Component({
  selector: 'app-manage-work',
  templateUrl: './manage-work.component.html',
  styleUrls: ['./manage-work.component.css']
})
export class ManageWorkComponent {

  work = [];
  message = '';

  constructor(private dataService: DataService, private dialog: MatDialog) {
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
            message: data
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
  }
}
