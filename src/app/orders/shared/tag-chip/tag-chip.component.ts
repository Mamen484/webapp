import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../../core/entities/tag';

@Component({
    selector: 'sf-tag-chip',
    templateUrl: './tag-chip.component.html',
    styleUrls: ['./tag-chip.component.scss']
})
export class TagChipComponent implements OnInit {

    @Input() tag: Tag;

    constructor() {
    }

    ngOnInit() {
    }

}
