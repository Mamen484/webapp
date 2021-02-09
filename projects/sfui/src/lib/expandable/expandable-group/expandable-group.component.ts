import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList } from '@angular/core';
import { SfuiExpandableComponent } from '../expandable.component';

@Component({
    selector: 'sfui-expandable-group',
    template: '<ng-content></ng-content>',
    styles: [''],
})
export class SfuiExpandableGroupComponent implements AfterContentInit {

    @ContentChildren(SfuiExpandableComponent, {descendants: true}) expandables: QueryList<SfuiExpandableComponent>;

    constructor() {
    }

    ngAfterContentInit() {
        this.expandables.forEach(expandable => expandable.openedChanged.subscribe((opened) => {
            if (opened) {
                this.expandables.forEach(innerExpandable => {
                    if (innerExpandable !== expandable) {
                        innerExpandable.opened = false;
                    }
                })
            }

        }))
    }

}
