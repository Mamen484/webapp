import { Component, OnInit } from '@angular/core';
import { BestSeller } from "./best-seller.model";

@Component({
  selector: 'app-home-page-best-seller',
  templateUrl: './home-page-best-seller.component.html',
  styleUrls: ['./home-page-best-seller.component.scss']
})
export class HomePageBestSellerComponent implements OnInit {
  public bestSellers: Array<BestSeller> = [
    new BestSeller('https://app.shopping-feed.com/images/registration/logo_sf_other.svg', 'foo'),
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
