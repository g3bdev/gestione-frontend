import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {dropDownAnimation} from "../animations";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('rotatedState', [
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(180deg)'})),
      transition('rotated => default', animate('500ms ease-out')),
      transition('default => rotated', animate('500ms ease-in'))
    ]), dropDownAnimation
  ]
})
export class DashboardComponent implements OnInit {

  name = '';
  logged_role = localStorage.getItem('role');
  isOpen = false;
  arrowDown = faAngleDown;
  state = 'default';

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']).then();
    }
    this.authService.getUserInfo().subscribe({
      next: (data: any) => {
        this.name = data.User.first_name + "!";
      }
    });
  }
}
