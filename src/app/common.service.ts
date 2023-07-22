import {Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loading = false;
  exp: RegExp = /\r\n|\n\r|\n|\r/g;
  fa_exclamation_circle = faExclamationCircle;

  constructor(private dataService: DataService, private snackbar: MatSnackBar) {
  }

  openSnackBar(message: string) {
    const ua = navigator.userAgent;
    let verticalPosition: any;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      verticalPosition = 'top';
    } else {
      verticalPosition = 'bottom';
    }
    this.snackbar.open(message, '', {
      duration: 4000,
      verticalPosition: verticalPosition,
      panelClass: 'snackbar'
    });
  }

  printReport(id: number) {
    this.loading = true;
    let filename = '';
    this.dataService.getReportById(id).subscribe((data: any) => {
      filename = data.Report.date.replaceAll('-', '') + '_' + data.last_name.toUpperCase() + '.pdf';
    });
    this.dataService.printReport(id).subscribe((response) => {
      this.loading = false;
      const file = new Blob([response], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(file);
      const anchor = document.createElement("a");
      anchor.download = filename;
      anchor.href = url;
      anchor.click();
    });
  }
}


