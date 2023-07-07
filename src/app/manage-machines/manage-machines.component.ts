import {Component, HostListener, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {EditMachineComponent} from "../edit-machine/edit-machine.component";
import {MatDialog} from "@angular/material/dialog";
import {faArrowLeft, faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {TooltipPosition} from "@angular/material/tooltip";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {CommonService} from "../common.service";

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

  constructor(private dataService: DataService, private dialog: MatDialog, private common: CommonService) {
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

  editMachine(id: number) {
    this.dataService.getMachineById(id).subscribe({
      next: (data: any) => {
        const dialogRef = this.dialog.open(EditMachineComponent, {
          data: {
            title: 'Modifica macchina', message: data
          }, width: '50em'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const index = this.machines.findIndex(machine => machine['Machine']['id'] === id);
            if (index !== -1) {
              this.dataService.getMachineById(id).subscribe({
                next: (data: any) => {
                  Object.assign(this.machines[index], data);
                  this.machines = [...this.machines];
                }
              });
            }
          }
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
            this.common.openSnackBar(data.detail);
            const index = this.machines.findIndex(machine => machine['Machine']['id'] === id);
            if (index !== -1) {
              this.machines.splice(index, 1);
              this.machines = [...this.machines];
            }
          }, error: (error) => {
            this.common.openSnackBar(error.error.detail);
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
