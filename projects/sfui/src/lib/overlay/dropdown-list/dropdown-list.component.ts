import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { timer } from 'rxjs';

let id = 0;

@Component({
    selector: 'sfui-dropdown-list',
    templateUrl: './dropdown-list.component.html',
    styleUrls: ['./dropdown-list.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class SfuiDropdownListComponent {

    customId = id++;
    dropdownVisible = false;

    constructor(private elementRef: ElementRef<HTMLElement>,
                public changeDetectorRef: ChangeDetectorRef) {
    }

    _opened = false;

    get opened() {
        return this._opened;
    }

    @Input()
    set opened(value: boolean) {
        this._opened = value;
        if (value) {
            this.dropdownVisible = true;
            this.changeDetectorRef.detectChanges();
        } else {
            timer(75).subscribe(() => {
                this.dropdownVisible = false;
                this.changeDetectorRef.detectChanges();
            });
        }
    }

    @HostBinding('attr.sfui-id') get sfuiId() {
        return `sfui-dropdown-list-${this.customId}`;
    }

    @Input() set position(value: { left: number; top: number }) {
        this.elementRef.nativeElement.style.left = value.left + 'px';
        this.elementRef.nativeElement.style.top = value.top + 'px';
    }

    triggerOpened() {
        this.opened = !this.opened;
    }

    backdropClick() {
        this.opened = false;
    }
}
