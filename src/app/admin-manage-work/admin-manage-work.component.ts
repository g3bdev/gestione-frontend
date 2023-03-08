import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-manage-work',
  templateUrl: './admin-manage-work.component.html',
  styleUrls: ['./admin-manage-work.component.css']
})
export class AdminManageWorkComponent implements OnInit {

  work = [];

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
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteWork(id).subscribe({
          next: (data: any) => {
            console.log(data);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
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
