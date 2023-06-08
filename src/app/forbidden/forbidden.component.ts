import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({opacity: 0}),
        animate(500,
          style({opacity: 1}))
      ])
    ])
  ]
})
export class ForbiddenComponent implements OnInit {

  display = false;

  constructor(public location: Location) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.display = true;
    }, 1000);
  }
}
