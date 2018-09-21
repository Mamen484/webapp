import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[sfMinNumber]',
})
export class MinNumberDirective implements OnInit {

    @Input() sfMinNumber;
    protected el: HTMLInputElement;

    constructor(protected element: ElementRef) {
    }

    ngOnInit() {
        this.el = this.element.nativeElement;
        this.el.addEventListener('blur', (event: KeyboardEvent) => {
            if (isNaN(+this.el.value) || this.el.value < this.sfMinNumber) {
                this.el.value = this.sfMinNumber;
            }
        });
    }
}
