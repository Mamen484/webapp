import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plateform',
  templateUrl: './plateform.component.html',
  styleUrls: ['./plateform.component.scss']
})
export class PlateformComponent implements OnInit {
  public daysLeft: number = 0;
  public price: string = "";

  constructor() { }

  ngOnInit() {
  }

}
