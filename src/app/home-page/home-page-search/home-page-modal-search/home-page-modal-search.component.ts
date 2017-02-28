import { Component } from '@angular/core';
import { ModalFlag } from './modal-search.model';

@Component({
  selector: 'app-home-page-modal-search',
  templateUrl: './home-page-modal-search.component.html',
  styleUrls: ['./home-page-modal-search.component.scss']
})

export class HomePageModalSearchComponent  {

  public flags: Array<ModalFlag> = [
    new ModalFlag('http://app.shopping-feed.com/images/flags/United-States.png', 'US'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/France.png', 'Fr'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/United-Kingdom.png', 'UK'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Germany.png', 'De'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Spain.png', 'Es'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Italy.png', 'It'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Thailand.png', 'Th'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Ireland.png', 'Ie'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Norway.png', 'No'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Russian-Federation.png', 'Ru'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Finland.png', 'Fi'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Greece.png', 'Gr'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Switzerland.png', 'Ch'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Brazil.png', 'Br'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/India.png', 'In'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Austria.png', 'At'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Netherlands.png', 'Nl'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Sweden.png', 'Sw'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Belgium.png', 'Be'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Mexico.png', 'Mx'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Czech-Republic.png', 'Cz'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Canada.png', 'Ca'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Denmark.png', 'Dk'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Poland.png', 'Pl'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Portugal.png', 'Pt'),
    new ModalFlag('http://app.shopping-feed.com/images/flags/Australia.png', 'Au')
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

  public valTab = [];

  test(newVal: any) {
    if (newVal.checked) {
      this.valTab.push(newVal.value);
    }
  }
}
