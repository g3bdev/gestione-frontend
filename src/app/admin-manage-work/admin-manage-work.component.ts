import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "../edit/edit.component";
import {faExclamationCircle, faInfoCircle, faPrint, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../common.service";

@Component({
  selector: 'app-admin-manage-work',
  templateUrl: './admin-manage-work.component.html',
  styleUrls: ['./admin-manage-work.component.css'],
  animations: [trigger('detailExpand', [state('collapsed', style({
    height: '0px', minHeight: '0'
  })), state('expanded', style({height: '*'})), transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),]),]
})
export class AdminManageWorkComponent implements OnInit {
  displayed_columns: string[] = ['operator', 'date', 'duration', 'type', 'location', 'client', 'site', 'actions'];
  operators = [];
  sites = [];
  work = [];
  message = '';
  error = '';
  fa_trash = faTrash;
  fa_info = faInfoCircle;
  fa_print = faPrint;
  fa_exclamation_circle = faExclamationCircle;
  fa_size: SizeProp = "xl";
  months = [];
  userForm = this.formBuilder.group({
    operator_id: ['0', Validators.required], site_id: ['0', Validators.required],
  });
  monthFilterForm = this.formBuilder.group({
    month: ['0', Validators.required]
  });
  intervalFilterForm = this.formBuilder.group({
    start_date: ['', Validators.required], end_date: ['', Validators.required]
  });
  filter = 'month';
  operator = '';

  constructor(private dataService: DataService, private dialog: MatDialog, private formBuilder: FormBuilder, public common: CommonService) {
  }

  select(event: Event, value: string, form: FormGroup) {
    const selectedValue = (event.target as HTMLInputElement).value;
    form.patchValue({
      [value]: selectedValue
    });
    this.dataService.getMonths(this.userForm.value.operator_id!, this.userForm.value.site_id!).subscribe({
      next: (data: any) => {
        this.months = data;
      }
    });
    if (form === this.userForm && value === 'operator_id') {
      this.userForm.patchValue({
        site_id: '0'
      });
      this.monthFilterForm.patchValue({
        month: '0'
      });
      this.dataService.getUserSites(this.userForm.value.operator_id!).subscribe({
        next: (data: any) => {
          this.dataService.getUserMonthlyWork(this.userForm.value.site_id!, this.monthFilterForm.value.month!, this.userForm.value.operator_id!).subscribe({
            next: (data: any) => {
              this.checkWork(data);
              this.work = data;
              if (data.length > 0) {
                this.operator = data[0].last_name + " " + data[0].first_name;
              } else {
                this.operator = '';
              }
            }
          });
          this.sites = data;
        }
      });
    } else if (form == this.userForm && value === 'site_id') {
      this.dataService.getUserMonthlyWork(this.userForm.value.site_id!, this.monthFilterForm.value.month!, this.userForm.value.operator_id!).subscribe({
        next: (data: any) => {
          this.checkWork(data);
          this.work = data;
        }
      });
    } else if (form === this.monthFilterForm && value === 'month') {
      this.dataService.getUserMonthlyWork(this.userForm.value.site_id!, this.monthFilterForm.value.month!, this.userForm.value.operator_id!).subscribe({
        next: (data: any) => {
          this.checkWork(data);
          this.work = data;
        }
      });
    } else if (form === this.intervalFilterForm && value === 'start_date' || form === this.intervalFilterForm && value === 'end_date') {
      this.dataService.getUserIntervalWork(this.userForm.value.site_id!, this.intervalFilterForm.value.start_date!, this.intervalFilterForm.value.end_date!, this.userForm.value.operator_id!).subscribe({
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
        this.dataService.deleteWork(id).subscribe({
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
    this.dataService.getWorkById(id).subscribe({
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
    this.dataService.getWork().subscribe({
      next: (data: any) => {
        this.work = data;
        if (data.length === 0) {
          this.error = 'Non ci sono interventi da visualizzare';
        }
      }
    });
    this.dataService.getMonths(this.userForm.value.operator_id!, this.userForm.value.site_id!).subscribe({
      next: (data: any) => {
        this.months = data;
      }
    });
    this.dataService.getUsers().subscribe({
      next: (data: any) => {
        this.operators = data;
      }
    });
    this.dataService.getSites().subscribe({
      next: (data: any) => {
        this.sites = data;
      }
    });
  }
}
