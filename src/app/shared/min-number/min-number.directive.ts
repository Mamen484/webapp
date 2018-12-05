import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[sfMinNumber]',
})
export class MinNumberDirective implements OnInit {

    @Input() sfMinNumber;
    @Output() invalidValueSet = new EventEmitter();
    protected el: HTMLInputElement;

    constructor(protected element: ElementRef) {
    }

    ngOnInit() {
        this.el = this.element.nativeElement;
        this.el.addEventListener('blur', (event: KeyboardEvent) => {
            if (isNaN(+this.el.value) || this.el.value < this.sfMinNumber) {
                this.invalidValueSet.emit();
            }
        });
    }
}
