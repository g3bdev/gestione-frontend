import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../data.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {EditComponent} from "../edit/edit.component";
import {faExclamationCircle, faInfoCircle, faPrint, faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../common.service";
import {TooltipPosition} from "@angular/material/tooltip";
import {MatTableExporterDirective} from "mat-table-exporter";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-manage-work',
  templateUrl: './manage-work.component.html',
  styleUrls: ['./manage-work.component.css'],
  animations: [trigger('fade', [transition('void => *', [style({opacity: 0}), animate(100, style({opacity: 1}))])])]
})
export class ManageWorkComponent implements OnInit {
  @ViewChild('exporter') exporter!: MatTableExporterDirective;
  displayed_columns: string[] = ['operator', 'date', 'client', 'duration', 'intervention_type', 'machine', 'cost_center', 'commission', 'location', 'supervisor', 'description', 'actions'];
  user_columns: string[] = ['date', 'client', 'duration', 'intervention_type', 'machine', 'commission', 'location', 'supervisor', 'actions'];
  operators = [];
  clients = [];
  plants = [];
  machines = [];
  commissions = [];
  reports = [];
  logged_role = localStorage.getItem('role');
  error = '';
  fa_print = faPrint;
  fa_trash = faTrash;
  fa_info = faInfoCircle;
  fa_exclamation_circle = faExclamationCircle;
  fa_size: SizeProp = "xl";
  position: TooltipPosition = 'above';
  months = [];
  exp: RegExp = /\r\n|\n\r|\n|\r/g;
  reports_filename = 'interventi';
  adminForm = this.formBuilder.group({
    operator_id: ['0', Validators.required],
    client_id: ['0', Validators.required],
    plant_id: ['0', Validators.required],
    work_id: ['0', Validators.required]
  });
  monthFilterForm = this.formBuilder.group({
    month: ['0', Validators.required]
  });
  intervalFilterForm = this.formBuilder.group({
    start_date: [''], end_date: ['']
  });
  filter = 'month';
  loading = false;

  get isMachinesEmpty() {
    return this.machines.length === 0;
  }

  get isCommissionsEmpty() {
    return this.commissions.length === 0;
  }

  get isClientSelected() {
    return this.adminForm.value.client_id !== '0';
  }

  get isMachine() {
    return this.adminForm.value.plant_id !== 'c';
  }

  constructor(private dataService: DataService, private dialog: MatDialog, private formBuilder: FormBuilder, public common: CommonService, private snackBar: MatSnackBar) {
  }

  select(event: Event, value: string, form: FormGroup) {
    const selectedValue = (event.target as HTMLInputElement).value;
    form.patchValue({
      [value]: selectedValue
    });

    if (this.logged_role === 'admin') {
      if (this.adminForm.value.plant_id !== 'c') {
        if (value === 'client_id' || this.adminForm.value.plant_id === '0') {
          this.dataService.getPlantsByClient(+this.adminForm.value.client_id!).subscribe({
            next: (data: any) => {
              this.plants = data;
            }
          });
          this.machines = [];
          this.commissions = [];
          this.adminForm.patchValue({
            plant_id: '0', work_id: '0'
          });
        }
      } else if (this.adminForm.value.plant_id === 'c') {
        if (value === 'client_id') {
          this.dataService.getCommissionsByClient(+this.adminForm.value.client_id!).subscribe({
            next: (data: any) => {
              this.commissions = data;
            }
          });
          this.adminForm.patchValue({
            work_id: '0'
          });
        }
      }
      if (this.adminForm.value.plant_id !== 'c') {
        if (value === 'plant_id') {
          this.dataService.getMachineByPlant(+this.adminForm.value.plant_id!).subscribe({
            next: (data: any) => {
              this.machines = data;
            }
          });
          this.adminForm.patchValue({
            work_id: '0'
          });
        }
        if (this.filter === 'month') {
          this.dataService.getMonthlyReports(this.adminForm.value.client_id!, this.monthFilterForm.value.month!, this.adminForm.value.operator_id!, this.adminForm.value.plant_id!, this.adminForm.value.work_id!).subscribe({
            next: (data: any) => {
              this.reports = data;
              this.checkReports(data);
            }
          });
        } else if (this.filter === 'interval') {
          this.dataService.getIntervalReports(this.adminForm.value.client_id!, this.adminForm.value.operator_id!, this.intervalFilterForm.value.start_date!, this.intervalFilterForm.value.end_date!, this.adminForm.value.plant_id!, this.adminForm.value.work_id!).subscribe({
            next: (data: any) => {
              this.reports = data;
              this.checkReports(data);
            }
          });
        }
      }

      if (this.adminForm.value.plant_id === 'c') {
        if (value !== 'work_id') {
          this.dataService.getCommissionsByClient(+this.adminForm.value.client_id!).subscribe({
            next: (data: any) => {
              this.commissions = data;
            }
          });
        }
        if (this.filter === 'month') {
          this.dataService.getMonthlyCommissionReports(this.adminForm.value.client_id!, this.monthFilterForm.value.month!, this.adminForm.value.operator_id!, this.adminForm.value.work_id!).subscribe({
            next: (data: any) => {
              this.reports = data;
              this.checkReports(data);
            }
          });
        } else if (this.filter === 'interval') {
          this.dataService.getIntervalCommissionReports(this.adminForm.value.client_id!, this.adminForm.value.operator_id!, this.intervalFilterForm.value.start_date!, this.intervalFilterForm.value.end_date!, this.adminForm.value.plant_id!, this.adminForm.value.work_id!).subscribe({
            next: (data: any) => {
              this.reports = data;
              this.checkReports(data);
            }
          });
        }
      }
    }

    if (this.filter === 'month') {
      this.dataService.getMonths(this.adminForm.value.operator_id!).subscribe({
        next: (data: any) => {
          this.months = data;
        }
      });
      this.reports_filename = 'interventi_' + this.monthFilterForm.value.month?.replace('/', '-');
    } else if (this.filter === 'interval') {
      this.reports_filename = 'interventi_' + this.intervalFilterForm.value.start_date + '_' + this.intervalFilterForm.value.end_date;
    }
  }

  checkReports(data: any) {
    data.length === 0 ? this.error = 'Non ci sono interventi da visualizzare' : this.error = '';
  }

  getLastColumn(): number {
    if (this.logged_role === 'admin') {
      return this.displayed_columns.length - 1;
    } else {
      return this.user_columns.length - 1;
    }
  }

  printMonthlyReports() {
    this.loading = true;
    this.dataService.printMonthlyReports(this.adminForm.value.client_id!, this.monthFilterForm.value.month!, this.adminForm.value.operator_id!, this.adminForm.value.plant_id!).subscribe((response) => {
      this.loading = false;
      const file = new Blob([response], {type: 'application/pdf'});
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  editReport(id: number) {
    this.dataService.getReportById(id).subscribe({
      next: (data: any) => {
        this.dialog.open(EditComponent, {
          data: {
            title: 'Modifica intervento', message: data
          }, width: '50em'
        });
      }
    });
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
            this.openSnackBar(data.detail);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
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
          console.log(data);
          this.reports = data;
          this.checkReports(data);
        }
      });
    } else {
      this.dataService.getMyReports().subscribe({
        next: (data: any) => {
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
