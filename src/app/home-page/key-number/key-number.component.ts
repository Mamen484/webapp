import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-number',
  templateUrl: './key-number.component.html',
  styleUrls: ['./key-number.component.scss']
})

export class KeyNumberComponent implements OnInit {
  
  public KeyNumbers:Array<Object> = [
    {number: "1017598€", text: "chiffre d'affaires"},
    {number: "127498", text: "nombre de vente"},
    {number: "11598", text: "nombre de clic"}
  ];


  constructor() {
    this.KeyNumbers;
    
  }

  ngOnInit() {
  }

}
