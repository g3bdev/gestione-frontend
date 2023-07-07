import {Component, OnInit} from '@angular/core';
import {faArrowLeft, faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DataService} from "../data.service";
import {MatDialog} from "@angular/material/dialog";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {TooltipPosition} from "@angular/material/tooltip";
import {EditClientComponent} from "../edit-client/edit-client.component";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {CommonService} from "../common.service";

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css']
})
export class ManageClientsComponent implements OnInit {
  clients = [];
  client_columns: string[] = ['name', 'city', 'address', 'email', 'contact', 'phone_number', 'actions'];
  fa_trash = faTrash;
  fa_arrowLeft = faArrowLeft;
  fa_info = faInfoCircle;
  fa_size: SizeProp = "xl";
  position: TooltipPosition = 'above';

  constructor(private dataService: DataService, private dialog: MatDialog, private common: CommonService) {
  }

  editClient(id: number) {
    this.dataService.getClientById(id).subscribe({
      next: (data: any) => {
        const dialogRef = this.dialog.open(EditClientComponent, {
          data: {
            title: 'Modifica cliente', message: data
          }, width: '50em'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const index = this.clients.findIndex(client => client['id'] === id);
            if (index !== -1) {
              this.dataService.getClientById(id).subscribe({
                next: (data: any) => {
                  Object.assign(this.clients[index], data);
                  this.clients = [...this.clients];
                }
              });
            }
          }
        });
      }
    });
  }

  deleteClient(id: number) {
    let data = {
      data: {
        title: 'Conferma eliminazione',
        message: 'Sei sicuro di voler eliminare questo cliente?'
      }
    }
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, data);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteClient(id).subscribe({
          next: (data: any) => {
            this.common.openSnackBar(data.detail);
            const index = this.clients.findIndex(client => client['id'] === id);
            if (index !== -1) {
              this.clients.splice(index, 1);
              this.clients = [...this.clients];
            }
          }, error: (error) => {
            this.common.openSnackBar(error.error.detail);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getClients().subscribe({
      next: (data: any) => {
        this.clients = data;
      }
    });
  }


  protected readonly window = window;
}
