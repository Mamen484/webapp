import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-search',
  templateUrl: 'home-page-search.component.html',
  styleUrls: ['home-page-search.component.scss']
})
export class HomePageSearchComponent implements OnInit {

  public searchTabs = [];

  addSearchTab( newSearchTab: string ) {
    if(newSearchTab) {
      this.searchTabs.push(newSearchTab);
      console.log(this.valueOf());

    }
  }

  constructor() {}

  ngOnInit() {
  }

}
