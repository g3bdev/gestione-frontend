import {Component} from '@angular/core';
import {DataService} from "../data.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../delete-confirmation/delete-confirmation.component";
import {EditComponent} from "../edit/edit.component";
import {faExclamationCircle, faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-manage-work',
  templateUrl: './manage-work.component.html',
  styleUrls: ['./manage-work.component.css']
})
export class ManageWorkComponent {
  displayed_columns: string[] = ['date', 'duration', 'type', 'location', 'client', 'site', 'actions'];
  sites = [];
  work = [];
  message = '';
  error = '';
  fa_trash = faTrash;
  fa_info = faInfoCircle;
  fa_exclamation_circle = faExclamationCircle;
  fa_size: SizeProp = "xl";
  months = [];
  userForm = this.formBuilder.group({
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

  constructor(private dataService: DataService, private dialog: MatDialog, private formBuilder: FormBuilder) {
  }

  select(event: Event, value: string, form: FormGroup) {
    const selectedValue = (event.target as HTMLInputElement).value;
    form.patchValue({
      [value]: selectedValue
    });
    this.dataService.getMyMonths(this.userForm.value.site_id!).subscribe({
      next: (data: any) => {
        this.months = data;
      }
    });
    if (form == this.userForm && value === 'site_id') {
      this.dataService.getMyMonthlyWork(this.userForm.value.site_id!, this.monthFilterForm.value.month!).subscribe({
        next: (data: any) => {
          this.work = data;
        }
      });
    } else if (form === this.monthFilterForm && value === 'month') {
      this.dataService.getMyMonthlyWork(this.userForm.value.site_id!, this.monthFilterForm.value.month!).subscribe({
        next: (data: any) => {
          this.checkWork(data);
          this.work = data;
        }
      });
    } else if (form === this.intervalFilterForm && value === 'start_date' || form === this.intervalFilterForm && value === 'end_date') {
      this.dataService.getMyIntervalWork(this.userForm.value.site_id!, this.intervalFilterForm.value.start_date!, this.intervalFilterForm.value.end_date!).subscribe({
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

  printTable() {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(22)
    doc.setTextColor(100)
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.getWidth();
    const pageHeight = pageSize.getHeight();
    doc.text('ITW srl', pageWidth - 30, pageHeight - 10);
    doc.text('Interventi', 14, 10);
    let str = `Totale ore: `;
    autoTable(doc, {
      html: '#table', headStyles: {fillColor: [155, 89, 182]},
      didDrawPage: function (data) {
        doc.setTextColor(40)
        doc.setFontSize(10)
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10)
      },
      startY: 20,
    });
    window.open(doc.output('bloburl'), '_blank');
  }

  ngOnInit(): void {
    this.dataService.getMyWork().subscribe({
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
    this.dataService.getMySites().subscribe({
      next: (data: any) => {
        this.sites = data;
      }
    });
  }
}
