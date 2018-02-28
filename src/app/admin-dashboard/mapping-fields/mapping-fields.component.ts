import { Component, Input } from '@angular/core';

@Component({
    selector: 'sf-mapping-fields',
    templateUrl: './mapping-fields.component.html',
    styleUrls: ['./mapping-fields.component.scss']
})
export class MappingFieldsComponent {
    @Input() formGroup;
}
