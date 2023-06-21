import {Component, HostListener, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {EditMachineComponent} from "../edit-machine/edit-machine.component";
import {MatDialog} from "@angular/material/dialog";
import {faArrowLeft, faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {TooltipPosition} from "@angular/material/tooltip";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-manage-machines',
  templateUrl: './manage-machines.component.html',
  styleUrls: ['./manage-machines.component.css']
})

export class ManageMachinesComponent implements OnInit {
  machines = [];
  machine_columns: string[] = ['code', 'name', 'client', 'plant', 'cost_center', 'brand', 'model', 'production_year', 'actions'];
  fa_arrowLeft = faArrowLeft;
  fa_trash = faTrash;
  fa_info = faInfoCircle;
  fa_size: SizeProp = "xl";
  position: TooltipPosition = 'above';
  limit = 25;
  machine_list = [];

  constructor(private dataService: DataService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      this.loadMore();
    }
  }

  loadMore() {
    this.limit += 25;
    this.dataService.getMachines(this.limit).subscribe({
      next: (data: any) => {
        this.machines = data;
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  editMachine(id: number) {
    this.dataService.getMachineById(id).subscribe({
      next: (data: any) => {
        this.dialog.open(EditMachineComponent, {
          data: {
            title: 'Modifica macchina', message: data
          }, width: '50em'
        });
      }
    });
  }

  deleteMachine(id: number) {
    let data = {
      data: {
        title: 'Conferma eliminazione',
        message: 'Sei sicuro di voler eliminare questa macchina?'
      }
    }
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, data);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteMachine(id).subscribe({
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
    this.dataService.getMachines(this.limit).subscribe({
      next: (data: any) => {
        this.machines = data;
      }
    });
  }

  protected readonly location = location;
  protected readonly window = window;
}
