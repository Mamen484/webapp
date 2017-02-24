import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-platform-card',
  templateUrl: './home-page-platform-card.component.html',
  styleUrls: ['./home-page-platform-card.component.scss']
})
export class HomePagePlatformCardComponent implements OnInit {
  private numberofSelectedProducts: number = 723;
  private numberOfErrors: number = 46;
  private price: string = "99$";

  public fakePdm = new Array(5);
  public fakeNewPdm = new Array(7);
  public fakeNewPdmInter = new Array(4);

  constructor() {}

  ngOnInit() {
  }

}
