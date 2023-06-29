import {Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loading = false;

  constructor(private dataService: DataService, private snackbar: MatSnackBar) {
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, '', {
      duration: 3000,
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


