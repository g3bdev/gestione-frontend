import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "../edit/edit.component";

@Component({
  selector: 'app-admin-manage-work',
  templateUrl: './admin-manage-work.component.html',
  styleUrls: ['./admin-manage-work.component.css']
})
export class AdminManageWorkComponent implements OnInit {

  work = [];
  message = '';

  constructor(private dataService: DataService, private dialog: MatDialog) {
  }


  sortBy(sort: string, order: string) {
    this.dataService.getWork(sort, order).subscribe({
      next: (data: any) => {
        this.work = data;
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
            message: data
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getWork().subscribe({
      next: (data: any) => {
        this.work = data;
      }
    });
  }

}
