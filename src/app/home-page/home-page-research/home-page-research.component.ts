import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-research',
  templateUrl: './home-page-research.component.html',
  styleUrls: ['./home-page-research.component.scss']
})
export class HomePageResearchComponent implements OnInit {

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
