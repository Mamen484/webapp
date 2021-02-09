import { AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { SfuiDropdownListComponent } from './dropdown-list.component';

@Directive({
    selector: '[sfuiDropdownTriggerFor]'
})
export class SfuiDropdownTriggerDirective implements AfterViewInit, AfterViewChecked {

    @Input('sfuiDropdownTriggerFor') sfuiDropdownList: SfuiDropdownListComponent;
    position: {left: number, top: number};

    constructor(private elementRef: ElementRef<HTMLElement>) {
    }

    @HostListener('click') onClick() {
        this.sfuiDropdownList.triggerOpened();
    }

    ngAfterViewInit() {
        this.position = {
            left: this.elementRef.nativeElement.getBoundingClientRect().left,
            top: this.elementRef.nativeElement.getBoundingClientRect().bottom,
        }
        this.sfuiDropdownList.position = this.position;
    }

    ngAfterViewChecked() {
        if (this.position.left !== this.elementRef.nativeElement.getBoundingClientRect().left
            || this.position.top !== this.elementRef.nativeElement.getBoundingClientRect().bottom) {
            this.ngAfterViewInit();
        }
    }

}
