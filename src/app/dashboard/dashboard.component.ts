import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name = '';
  work = [];
  logged_role = localStorage.getItem('role');


  constructor(private dataService: DataService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']).then();
    }
    this.authService.getUserInfo().subscribe({
      next: (data: any) => {
        this.name = data.first_name + "!";
      }
    });
  }
}
