import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page-key-number',
  templateUrl: './home-page-key-number.component.html',
  styleUrls: ['./home-page-key-number.component.scss']
})
export class HomePageKeyNumberComponent {

  public KeyNumbers:Array<Object> = [
    "1017598 €",
    "127498",
    "11598",
  ];

}
