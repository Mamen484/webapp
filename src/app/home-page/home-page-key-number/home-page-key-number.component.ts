import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page-key-number',
  templateUrl: './home-page-key-number.component.html',
  styleUrls: ['./home-page-key-number.component.scss']
})
export class HomePageKeyNumberComponent {

  public KeyNumbers:Array<Object> = [
    {number: "1017598€", text: "chiffre d'affaires"},
    {number: "127498", text: "nombre de vente"},
    {number: "11598", text: "nombre de clic"}
  ];

}
