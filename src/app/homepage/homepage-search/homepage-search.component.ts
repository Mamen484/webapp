import { Component } from '@angular/core';
import { ModalSearchFlag } from './modal-search-flag.model';
import { OnInit } from "@angular/core";

@Component({
  selector: 'app-homepage-search',
  templateUrl: 'homepage-search.component.html',
  styleUrls: ['homepage-search.component.scss']
})
export class HomepageSearchComponent implements OnInit {
  private filterInput: string = '';

  private flags: Array<ModalSearchFlag> = [
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/United-States.png', 'US'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/France.png', 'Fr'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/United-Kingdom.png', 'UK'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Germany.png', 'De'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Spain.png', 'Es'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Italy.png', 'It'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Thailand.png', 'Th'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Ireland.png', 'Ie'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Norway.png', 'No'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Russian-Federation.png', 'Ru'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Finland.png', 'Fi'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Greece.png', 'Gr'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Switzerland.png', 'Ch'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Brazil.png', 'Br'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/India.png', 'In'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Austria.png', 'At'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Netherlands.png', 'Nl'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Sweden.png', 'Sw'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Belgium.png', 'Be'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Mexico.png', 'Mx'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Czech-Republic.png', 'Cz'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Canada.png', 'Ca'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Denmark.png', 'Dk'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Poland.png', 'Pl'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Portugal.png', 'Pt'),
    new ModalSearchFlag('https://app.shopping-feed.com/images/flags/Australia.png', 'Au'),
  ];

  private platformCriteria: string[] = [
    "places de marché",
    "comparateurs",
    "pla",
    "affiliation",
    "social local mobile",
  ];

  private categoryCriteria: string[] = [
    "généraliste",
    "achats professionnels",
    "auto / moto",
    "bio",
    "electroménager",
    "gastronomie",
    "high tech",
    "jeux et jouets",
    "maison et jardin",
    "puériculture",
    "santé / beauté",
    "vins et spiritueux",
    "mode",
    "sports et loisirs",
  ];

  private filters: {} = {};

  ngOnInit(): void {
    for (let foo of this.categoryCriteria) {
      this.setFilter(foo, false);
    }
  }

  private pushFilterFromInput(): void {
    this.setFilter(this.filterInput, true);
    this.filterInput = '';
  }

  private hasFilter(filter: string): boolean {
    return "undefined" !== typeof this.filters[filter] && this.filters[filter].checked;
  }

  private toggleFilter(filter: string): void {
    this.setFilter(filter, !this.hasFilter(filter));
  }

  private setFilter(name: string, value: boolean) {
    this.filters[name] = {checked: value};
  }

  private removeFilter(filter: string): void {
    this.setFilter(filter, false);
  }

  private getActiveFilters(): string[] {
    let activeFilters = [];
    for (let key in this.filters) {
      if (this.filters.hasOwnProperty(key) && this.filters[key].checked) {
        activeFilters.push(key);
      }
    }
    return activeFilters;
  }
}
