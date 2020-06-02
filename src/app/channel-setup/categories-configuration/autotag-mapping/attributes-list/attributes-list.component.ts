import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Autotag } from '../../../autotag';

@Component({
  selector: 'sf-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.scss']
})
export class AttributesListComponent implements OnInit {

  @Input() required: Boolean;

  @Input() autotagList: Autotag[];
  @Output() attributeChanged = new EventEmitter<{attribute: Autotag, value: string}>();

  constructor() { }

  ngOnInit(): void {
  }

}
