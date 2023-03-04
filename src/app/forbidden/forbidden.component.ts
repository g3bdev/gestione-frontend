import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  constructor() { }

  display = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.display = true;
    }, 2000);
  }

}
