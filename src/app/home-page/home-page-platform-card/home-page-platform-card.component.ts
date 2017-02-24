import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-platform-card',
  templateUrl: './home-page-platform-card.component.html',
  styleUrls: ['./home-page-platform-card.component.scss']
})
export class HomePagePlatformCardComponent implements OnInit {

  fakePdm = new Array(5);
  fakeNewPdm = new Array(7);

  constructor() {
    this.fakePdm;
    this.fakeNewPdm;
  }
  test () {
    alert('ok');
  }
  ngOnInit() {
  }

}
