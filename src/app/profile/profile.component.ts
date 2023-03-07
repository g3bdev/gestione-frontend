import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {faAt, faBuilding, faEnvelope, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  first_name = '';
  last_name = '';
  email = '';
  username = '';
  phone_number = '';
  role = '';
  logged_role = '';
  fa_user = faUser;
  fa_envelope = faEnvelope;
  fa_at = faAt;
  fa_phone = faPhone;
  fa_building = faBuilding;
  fa_user_size: SizeProp = "2xl";

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data: any) => {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.username = data.username;
        this.phone_number = data.phone_number;
        this.role = data.role;
      }
    });
  }


}
