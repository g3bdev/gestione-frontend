import {Component, OnInit} from '@angular/core';
import {faArrowLeft, faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {TooltipPosition} from "@angular/material/tooltip";
import {DataService} from "../data.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {EditCommissionComponent} from "../edit-commission/edit-commission.component";

@Component({
  selector: 'app-manage-commissions',
  templateUrl: './manage-commissions.component.html',
  styleUrls: ['./manage-commissions.component.css']
})
export class ManageCommissionsComponent implements OnInit {
  commissions = [];
  commission_columns: string[] = ['code', 'client_id', 'description', 'actions'];
  fa_arrowLeft = faArrowLeft;
  fa_trash = faTrash;
  fa_info = faInfoCircle;
  fa_size: SizeProp = "xl";
  position: TooltipPosition = 'above';


  constructor(private dataService: DataService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  editCommission(id: number) {
    this.dataService.getCommissionById(id).subscribe({
      next: (data: any) => {
        this.dialog.open(EditCommissionComponent, {
          data: {
            title: 'Modifica commessa', message: data
          }, width: '50em'
        });
      }
    });
  }

  deleteCommission(id: number) {
    let data = {
      data: {
        title: 'Conferma eliminazione',
        message: 'Sei sicuro di voler eliminare questa commessa?'
      }
    }
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, data);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteCommission(id).subscribe({
          next: (data: any) => {
            this.openSnackBar(data.detail);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }, error: (error) => {
            this.openSnackBar(error.error.detail);
          }
        });
      }
    });
  }

  ngOnInit() {
    this.dataService.getCommissions().subscribe({
      next: (data: any) => {
        console.log(data)
        this.commissions = data;
      }
    });
  }

  protected readonly window = window;
}
