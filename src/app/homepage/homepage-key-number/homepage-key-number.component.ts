import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage-key-number',
  templateUrl: 'homepage-key-number.component.html',
  styleUrls: ['homepage-key-number.component.scss']
})
export class HomepageKeyNumberComponent {
  public keyNumbers: string[] = [
    "1017598 €",
    "127498",
    "11598",
  ];
}
