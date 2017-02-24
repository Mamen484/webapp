import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-best-seller',
  templateUrl: './home-page-best-seller.component.html',
  styleUrls: ['./home-page-best-seller.component.scss']
})
export class HomePageBestSellerComponent implements OnInit {

  fakeArray = new Array(5);

  constructor() {
    this.fakeArray;
  }

  ngOnInit() {
  }

}
