import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sf-labels-dialog',
    templateUrl: './labels-dialog.component.html',
    styleUrls: ['./labels-dialog.component.scss']
})
export class LabelsDialogComponent implements OnInit {

    @Input() tags = [];

    constructor() {
    }

    ngOnInit() {
    }

    removeTag(tag) {
        this.tags.splice(this.tags.findIndex(t => t === tag), 1);
    }

    addTag(tag) {
        if (!tag || !tag.trim()) {
            return;
        }
        this.tags.push(tag);
    }

}
