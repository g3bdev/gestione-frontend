import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {faExclamationCircle, faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  client_columns: string[] = ['name', 'city', 'address', 'email', 'contact', 'phone_number', 'actions'];
  site_columns: string[] = ['name', 'code', 'description', 'actions'];
  machine_columns: string[] = ['name', 'client', 'cost_center', 'brand', 'model', 'production_year', 'actions'];
  fa_trash = faTrash;
  fa_info = faInfoCircle;
  fa_exclamation_circle = faExclamationCircle;
  fa_size: SizeProp = "xl";
  clients = [];
  commissions = [];
  machines = [];
  message = '';
  category = '';

  constructor(private dataService: DataService, private dialog: MatDialog) {
  }

  setCategory(category: string) {
    this.category = category;
  }

  delete(id: number, category: string) {
    let data;
    if (category === 'clients') {
      data = {
        data: {
          title: 'Conferma eliminazione',
          message: 'Sei sicuro di voler eliminare questo cliente?'
        }
      }
    } else if (category === 'commissions') {
      data = {
        data: {
          title: 'Conferma eliminazione',
          message: 'Sei sicuro di voler eliminare questa commessa?'
        }
      }
    } else if (category === 'machines') {
      data = {
        data: {
          title: 'Conferma eliminazione',
          message: 'Sei sicuro di voler eliminare questa macchina?'
        }
      }
    }
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, data);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteClient(id).subscribe({
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

  ngOnInit(): void {
    this.dataService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
    this.dataService.getCommissions().subscribe((data: any) => {
      this.commissions = data;
    });
    this.dataService.getMachines().subscribe((data: any) => {
      this.machines = data;
    });
  }
}
