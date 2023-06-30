import {Component} from '@angular/core';
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logged_role = localStorage.getItem('role');
  fa_profile = faUserCircle;
  fa_profile_size: SizeProp = "3x";

  constructor() {
  }

}
