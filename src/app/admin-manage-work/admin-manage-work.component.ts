import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-admin-manage-work',
  templateUrl: './admin-manage-work.component.html',
  styleUrls: ['./admin-manage-work.component.css']
})
export class AdminManageWorkComponent implements OnInit {

  work = [];

  constructor(private dataService: DataService) {
  }


  sortBy(sort: string, order: string) {
    this.dataService.getWork(sort, order).subscribe({
      next: (data: any) => {
        this.work = data;
      }
    });
  }

  deleteWork(id: number) {
    this.dataService.deleteWork(id).subscribe({
      next: () => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getWork().subscribe({
      next: (data: any) => {
        this.work = data;
      }
    });
  }

}
