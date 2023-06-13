import {Injectable} from '@angular/core';
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private dataService: DataService) {
  }

  printReport(id: number) {
    this.dataService.printReport(id).subscribe((response) => {
      const file = new Blob([response], {type: 'application/pdf'});
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}


