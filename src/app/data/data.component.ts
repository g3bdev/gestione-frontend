import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  users = [];

  selectedID = 1;

  onChange(id: number) {
    this.dataService.getUserById(id).subscribe((data: any) => {
      console.log(data);
      document.getElementById('box')!.innerHTML = data.first_name + '<br>' + data.last_name + '<br>' + data.id;
    });
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }
}
