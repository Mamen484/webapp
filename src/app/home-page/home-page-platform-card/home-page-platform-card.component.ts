import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-platform-card',
  templateUrl: './home-page-platform-card.component.html',
  styleUrls: ['./home-page-platform-card.component.scss']
})
export class HomePagePlatformCardComponent implements OnInit {

  public fakePdm = new Array(5);
  public fakeNewPdm = new Array(7);
  public fakeNewPdmInter = new Array(4);

  constructor() {}
  
  
  test () {
    alert('ok');
  }
  
  
  ngOnInit() {
  }

}
