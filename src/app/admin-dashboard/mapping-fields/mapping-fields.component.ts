import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sf-mapping-fields',
  templateUrl: './mapping-fields.component.html',
  styleUrls: ['./mapping-fields.component.scss']
})
export class MappingFieldsComponent implements OnInit {

  @Input() formGroup;

  constructor() { }

  ngOnInit() {
  }

}
