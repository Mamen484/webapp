import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../../core/entities/tag';

@Component({
    selector: 'sf-tag-chip',
    templateUrl: './tag-chip.component.html',
    styleUrls: ['./tag-chip.component.scss']
})
export class TagChipComponent {

    @Input() tag: Tag;
    @Input() removable = false;

    @Output() removed = new EventEmitter();

}
