import { AfterContentInit, Component, ElementRef } from '@angular/core';
import { SfuiExpandableComponent } from '../expandable.component';

@Component({
    selector: 'sfui-expandable-group',
    template: '<ng-content></ng-content>',
    styles: [''],
})
export class SfuiExpandableGroupWebComponent implements AfterContentInit {

    constructor(private elementRef: ElementRef<HTMLElement>) {
    }

    ngAfterContentInit() {
        setTimeout(() => {
            const element = this.elementRef.nativeElement;
            const elements = element.querySelectorAll('sfui-expandable');
            element.addEventListener('openedChanged', (event) => {
                elements.forEach((expandable) => {
                    if (expandable !== event.target) {
                        (<SfuiExpandableComponent><unknown>expandable).opened = false;
                    }
                });
            });
        });


    }
}
