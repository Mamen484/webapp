import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'sfui-expandable',
    templateUrl: './expandable.component.html',
    styleUrls: ['./expandable.component.scss']
})
export class SfuiExpandableComponent implements OnInit {

    @Input() opened = false;
    @Output() openedChanged = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    toggle() {
        this.opened = !this.opened;
        this.openedChanged.emit(this.opened);
    }

}
