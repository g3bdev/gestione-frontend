import {Component} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-manage-work',
  templateUrl: './manage-work.component.html',
  styleUrls: ['./manage-work.component.css']
})
export class ManageWorkComponent {

  work = [];

  constructor(private dataService: DataService) {
  }

  deleteWork(id: number) {
    this.dataService.deleteWork(id).subscribe({
      next: (data: any) => {
        console.log(data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getUserWork().subscribe({
      next: (data: any) => {
        this.work = data;
      }
    });
  }

}
