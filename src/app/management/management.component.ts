import {Component} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  fa_arrowLeft = faArrowLeft;
  protected readonly window = window;
}
