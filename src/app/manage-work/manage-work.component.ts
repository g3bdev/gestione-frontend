import {Component} from '@angular/core';
import {DataService} from "../data.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {EditComponent} from "../edit/edit.component";
import {faExclamationCircle, faInfoCircle, faPrint, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../common.service";
import {TooltipPosition} from "@angular/material/tooltip";

@Component({
  selector: 'app-manage-work',
  templateUrl: './manage-work.component.html',
  styleUrls: ['./manage-work.component.css']
})
export class ManageWorkComponent {
  displayed_columns: string[] = ['date', 'duration', 'type', 'location', 'client', 'site', 'actions'];
  clients = [];
  commissions = [];
  work = [];
  message = '';
  error = '';
  fa_print = faPrint;
  fa_trash = faTrash;
  fa_info = faInfoCircle;
  fa_exclamation_circle = faExclamationCircle;
  fa_size: SizeProp = "xl";
  position: TooltipPosition = 'above';
  months = [];
  userForm = this.formBuilder.group({
    client_id: ['0', Validators.required],
    site_id: ['0', Validators.required],
  });
  monthFilterForm = this.formBuilder.group({
    month: ['0', Validators.required]
  });
  intervalFilterForm = this.formBuilder.group({
    start_date: ['', Validators.required],
    end_date: ['', Validators.required]
  });
  filter = 'month';

  constructor(private dataService: DataService, private dialog: MatDialog, private formBuilder: FormBuilder, public common: CommonService) {
  }

  select(event: Event, value: string, form: FormGroup) {
    const selectedValue = (event.target as HTMLInputElement).value;
    form.patchValue({
      [value]: selectedValue
    });
    if (value === 'client_id') {
      this.dataService.getCommissionsByClient(+this.userForm.value.client_id!).subscribe({
        next: (data: any) => {
          this.commissions = data;
        }
      });
    }
    this.dataService.getMyMonths(this.userForm.value.site_id!).subscribe({
      next: (data: any) => {
        this.months = data;
      }
    });
    if (form == this.userForm && value === 'site_id') {
      this.dataService.getMyMonthlyReports(this.userForm.value.site_id!, this.monthFilterForm.value.month!).subscribe({
        next: (data: any) => {
          this.work = data;
        }
      });
    } else if (form === this.monthFilterForm && value === 'month') {
      this.dataService.getMyMonthlyReports(this.userForm.value.site_id!, this.monthFilterForm.value.month!).subscribe({
        next: (data: any) => {
          this.checkWork(data);
          this.work = data;
        }
      });
    } else if (form === this.intervalFilterForm && value === 'start_date' || form === this.intervalFilterForm && value === 'end_date') {
      this.dataService.getMyIntervalReports(this.userForm.value.site_id!, this.intervalFilterForm.value.start_date!, this.intervalFilterForm.value.end_date!).subscribe({
        next: (data: any) => {
          this.checkWork(data);
          this.work = data;
        }
      });
    }
  }

  checkWork(data: any) {
    if (data.length === 0) {
      this.error = 'Non ci sono interventi da visualizzare';
    } else {
      this.error = '';
    }
  }

  deleteWork(id: number) {
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

  editWork(id: number) {
    this.dataService.getReportById(id).subscribe({
      next: (data: any) => {
        this.dialog.open(EditComponent, {
          data: {
            title: 'Modifica intervento', message: data
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getMyReports().subscribe({
      next: (data: any) => {
        this.work = data;
        if (data.length === 0) {
          this.error = 'Non ci sono interventi da visualizzare';
        }
      }
    });
    this.dataService.getMyMonths(this.userForm.value.site_id!).subscribe({
      next: (data: any) => {
        this.months = data;
      }
    });
    this.dataService.getClients().subscribe({
      next: (data: any) => {
        this.clients = data;
      }
    });
    this.dataService.getMyCommissions().subscribe({
      next: (data: any) => {
        this.commissions = data;
      }
    });
  }
}
