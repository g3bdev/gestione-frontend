import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users = [];
  first_name = '';
  last_name = '';
  email = '';
  username = '';
  phone_number = '';
  role = '';
  selectedID = 1;
  logged_role = '';

  constructor(private dataService: DataService, private authService: AuthService) {
  }

  onChange(id: number) {
    this.dataService.getUserById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.username = data.username;
        this.phone_number = data.phone_number;
        this.role = data.role;
      },
      error: () => {
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data: any) => {
        console.log(data)
        this.logged_role = data.role;
      }
    });
    this.dataService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }
}
