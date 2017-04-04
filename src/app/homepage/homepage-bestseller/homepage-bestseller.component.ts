import { Component } from '@angular/core';
import { Bestseller } from "./bestseller.model";

@Component({
  selector: 'app-homepage-bestseller',
  templateUrl: 'homepage-bestseller.component.html',
  styleUrls: ['homepage-bestseller.component.scss']
})
export class HomePageBestSellerComponent {
  public bestSellers: Array<Bestseller> = [
    new Bestseller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
    new Bestseller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
    new Bestseller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
    new Bestseller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
    new Bestseller('http://www.coindugeek.com/8068-thickbox_default/figurine-pop-walking-dead-negan.jpg', 'foo'),
  ];
}
