import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'sfui-expandable',
    templateUrl: './expandable.component.html',
    styleUrls: ['./expandable.component.scss']
})
export class SfuiExpandableWebComponent implements OnInit {

    @Input() opened = false;

    constructor(protected elementRef: ElementRef<HTMLElement>) {
    }

    ngOnInit(): void {
    }

    toggle() {
        this.opened = !this.opened;
        this.elementRef.nativeElement.dispatchEvent(new Event('openedChanged', {bubbles: true, cancelable: true}));
    }

}
