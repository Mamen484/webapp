import { Component, OnInit } from '@angular/core';
import { Platform } from "./platform.model";


@Component({
  selector: 'app-homepage-platform-card',
  templateUrl: 'homepage-platform-card.component.html',
  styleUrls: ['homepage-platform-card.component.scss']
})
export class HomepagePlatformCardComponent implements OnInit {
  private numberofSelectedProducts: number = 723;
  private numberOfErrors: number = 46;
  private price: string = "99$";
  private newPrice: string = "50€";
  

  public platforms: Array<Platform> = [
    new Platform('https://app.shopping-feed.com/images/logos/idealo.png', 'idealo'),
    new Platform('https://app.shopping-feed.com/images/logos/effiliation.png', 'effiliation'),
    new Platform('https://app.shopping-feed.com/images/logos/googleshopping.png', 'googleshopping'),
    new Platform('https://app.shopping-feed.com/images/logos/ebay.png', 'ebay'),
    new Platform('https://app.shopping-feed.com/images/logos/rdc.png', 'rdc'),
  ];
  
  public newPlatforms: Array<Platform> = [
    new Platform('https://app.shopping-feed.com/images/logos/idealo.png', 'idealo'),
  ];
  
  public newPlatformsInter: Array<Platform> = [
    new Platform('https://app.shopping-feed.com/images/logos/googleshopping.png', 'googleshopping'),
  ];

  constructor() {}

  ngOnInit() {
  }

}
