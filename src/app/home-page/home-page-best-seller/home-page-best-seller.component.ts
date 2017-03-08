import { Component, OnInit } from '@angular/core';
import { BestSeller } from "./best-seller.model";

@Component({
  selector: 'app-home-page-best-seller',
  templateUrl: './home-page-best-seller.component.html',
  styleUrls: ['./home-page-best-seller.component.scss']
})
export class HomePageBestSellerComponent implements OnInit {
  public bestSellers: Array<BestSeller> = [
    new BestSeller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
    new BestSeller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
    new BestSeller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
    new BestSeller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
    new BestSeller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
