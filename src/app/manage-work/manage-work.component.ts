import {Component, ViewChild} from '@angular/core';
import {DataService} from "../data.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {EditComponent} from "../edit/edit.component";
import {faExclamationCircle, faInfoCircle, faPrint, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../common.service";
import {TooltipPosition} from "@angular/material/tooltip";
import {MatTableExporterDirective} from "mat-table-exporter";

@Component({
  selector: 'app-manage-work', templateUrl: './manage-work.component.html', styleUrls: ['./manage-work.component.css']
})
export class ManageWorkComponent {
  @ViewChild('exporter') exporter!: MatTableExporterDirective;
  displayed_columns: string[] = ['operator', 'date', 'client', 'duration', 'intervention_type', 'machine', 'commission', 'location', 'supervisor', 'description', 'actions'];
  user_columns: string[] = ['date', 'client', 'duration', 'intervention_type', 'machine', 'commission', 'location', 'supervisor', 'actions'];
  operators = [];
  clients = [];
  reports = [];
  logged_role = localStorage.getItem('role');
  message = '';
  error = '';
  fa_print = faPrint;
  fa_trash = faTrash;
  fa_info = faInfoCircle;
  fa_exclamation_circle = faExclamationCircle;
  fa_size: SizeProp = "xl";
  position: TooltipPosition = 'above';
  months = [];
  reports_filename = 'interventi';
  adminForm = this.formBuilder.group({
    operator_id: ['0', Validators.required], client_id: ['0', Validators.required]
  });
  userForm = this.formBuilder.group({
    client_id: ['0', Validators.required]
  });
  monthFilterForm = this.formBuilder.group({
    month: ['0', Validators.required]
  });
  intervalFilterForm = this.formBuilder.group({
    start_date: [''],
    end_date: ['']
  });
  filter = 'month';

  constructor(private dataService: DataService, private dialog: MatDialog, private formBuilder: FormBuilder, public common: CommonService) {
  }

  select(event: Event, value: string, form: FormGroup) {
    const selectedValue = (event.target as HTMLInputElement).value;
    form.patchValue({
      [value]: selectedValue
    });
    if (this.filter === 'month') {
      if (this.logged_role === 'admin') {
        this.dataService.getMonths(this.adminForm.value.operator_id!).subscribe({
          next: (data: any) => {
            console.log(data);
            this.months = data;
          }
        });
        this.dataService.getMonthlyReports(this.adminForm.value.client_id!, this.monthFilterForm.value.month!, this.adminForm.value.operator_id!).subscribe({
          next: (data: any) => {
            this.reports = data;
            this.checkReports(data);
          }
        });
      } else {
        this.dataService.getMyMonths(this.userForm.value.client_id!).subscribe({
          next: (data: any) => {
            this.months = data;
          }
        });
        this.dataService.getMyMonthlyReports(this.userForm.value.client_id!, this.monthFilterForm.value.month!).subscribe({
          next: (data: any) => {
            console.log(data);
            this.reports = data;
            this.checkReports(data);
          }
        });
      }
      this.reports_filename = 'interventi_' + this.monthFilterForm.value.month?.replace('/', '-');
    } else if (this.filter === 'interval') {
      if (this.logged_role === 'admin') {
        this.dataService.getIntervalReports(this.adminForm.value.client_id!, this.adminForm.value.operator_id!, this.intervalFilterForm.value.start_date!, this.intervalFilterForm.value.end_date!).subscribe({
          next: (data: any) => {
            this.reports = data;
            this.checkReports(data);
          }
        });
      } else {
        this.dataService.getMyIntervalReports(this.userForm.value.client_id!, this.intervalFilterForm.value.start_date!, this.intervalFilterForm.value.end_date!).subscribe({
          next: (data: any) => {
            this.reports = data;
            this.checkReports(data);
          }
        });
      }
      this.reports_filename = 'interventi_' + this.intervalFilterForm.value.start_date + '_' + this.intervalFilterForm.value.end_date;
    }
  }

  checkReports(data: any) {
    if (data.length === 0) {
      this.error = 'Non ci sono interventi da visualizzare';
    } else {
      this.error = '';
    }
  }

  getLastColumn(): number {
    if (this.logged_role === 'admin') {
      return this.displayed_columns.length - 1;
    } else {
      return this.user_columns.length - 1;
    }
  }

  deleteReport(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        title: 'Conferma eliminazione', message: 'Sei sicuro di voler eliminare questo intervento?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteReport(id).subscribe({
          next: (data: any) => {
            this.message = data;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
      }
    });
  }

  editReport(id: number) {
    this.dataService.getReportById(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.dialog.open(EditComponent, {
          data: {
            title: 'Modifica intervento', message: data
          }, width: '50em'
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.logged_role === 'admin') {
      this.dataService.getMonths('0').subscribe({
        next: (data: any) => {
          this.months = data;
        }
      });
      this.dataService.getReports().subscribe({
        next: (data: any) => {
          console.log(data)
          this.reports = data;
          this.checkReports(data);
        }
      });
    } else {
      this.dataService.getMyReports().subscribe({
        next: (data: any) => {
          console.log(data)
          this.reports = data;
          this.checkReports(data);
        }
      });
      this.dataService.getMyMonths('0').subscribe({
        next: (data: any) => {
          this.months = data;
        }
      });
    }
    this.dataService.getClients().subscribe({
      next: (data: any) => {
        this.clients = data;
      }
    });
    if (this.logged_role === 'admin') {
      this.dataService.getUsers().subscribe({
        next: (data: any) => {
          this.operators = data;
        }
      });
    }
  }
}
