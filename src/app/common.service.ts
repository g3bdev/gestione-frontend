import {Injectable} from '@angular/core';
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loading = false;

  constructor(private dataService: DataService) {
  }

  printReport(id: number) {
    this.loading = true;
    this.dataService.printReport(id).subscribe((response) => {
      this.loading = false;
      const file = new Blob([response], {type: 'application/pdf'});
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}


