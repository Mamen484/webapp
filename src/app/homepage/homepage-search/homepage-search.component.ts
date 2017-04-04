import { Component, OnInit } from '@angular/core';
import { ModalSearchFlag } from './modal-search-flag.model';


@Component({
  selector: 'app-homepage-search',
  templateUrl: 'homepage-search.component.html',
  styleUrls: ['homepage-search.component.scss']
})


export class HomepageSearchComponent implements OnInit {

  public flags: Array<ModalSearchFlag> = [
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/United-States.png', 'US'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/France.png', 'Fr'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/United-Kingdom.png', 'UK'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Germany.png', 'De'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Spain.png', 'Es'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Italy.png', 'It'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Thailand.png', 'Th'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Ireland.png', 'Ie'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Norway.png', 'No'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Russian-Federation.png', 'Ru'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Finland.png', 'Fi'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Greece.png', 'Gr'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Switzerland.png', 'Ch'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Brazil.png', 'Br'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/India.png', 'In'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Austria.png', 'At'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Netherlands.png', 'Nl'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Sweden.png', 'Sw'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Belgium.png', 'Be'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Mexico.png', 'Mx'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Czech-Republic.png', 'Cz'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Canada.png', 'Ca'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Denmark.png', 'Dk'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Poland.png', 'Pl'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Portugal.png', 'Pt'),
    new ModalSearchFlag('http://app.shopping-feed.com/images/flags/Australia.png', 'Au')
  ];

  public TextModalPlateforms:Array<Object> = [
    {text: "places de marché"},
    {text: "comparateurs"},
    {text: "pla"},
    {text: "affiliation"},
    {text: "social local mobile"}
  ];


  public TextModalProducts:Array<Object> = [
    {text: "généraliste"},
    {text: "achats professionnels"},
    {text: "auto / moto"},
    {text: "bio"},
    {text: "electroménager"},
    {text: "gastronomie"},
    {text: "high tech"},
    {text: "jeux et jouets"},
    {text: "maison et jardin"},
    {text: "puériculture"},
    {text: "santé / beauté"},
    {text: "vins et spiritueux"},
    {text: "mode"},
    {text: "sports et loisirs"}
  ];

  valTab = [];

  test(newVal: string) {
    const index = this.valTab.indexOf(newVal);
    if (index === -1) {
      this.valTab.push(newVal);
    }
    else {
      this.valTab.splice(index, 1);
    }
  }

  constructor() {}

  ngOnInit() {
  }

}
