import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'sf-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {

    @Input() initialValue: string;
    @Output() valueChanged = new EventEmitter();
    baseHref = environment.BASE_HREF + '/' + environment.LOCALE_ID;

    constructor() {
    }

    ngOnInit() {
    }

}
