import {Component} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestione';

  constructor(private router: Router, private authService: AuthService) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.authService.isLoggedIn()) {
            if (event.url === '/' || event.url === '/login') {
              this.router.navigate(['/dashboard']).then();
            }
          } else {
            if (event.url !== '/login') {
              this.router.navigate(['/login']).then();
            }
          }
        }
      });
    }
}
