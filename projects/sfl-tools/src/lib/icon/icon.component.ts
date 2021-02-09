import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Icon } from './icon';

@Component({
    selector: 'sft-icon',
    template: `<ng-content></ng-content>`,
    styles: [``]
})
export class IconComponent implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    @Input() set name(iconName: keyof Icon) {
        this.elementRef.nativeElement.innerHTML = Icon[iconName];
    }

    ngOnInit(): void {
    }

}
