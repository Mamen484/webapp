import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[sfMinNumber]',
})
export class MinNumberDirective implements OnInit {

    @Input() sfMinNumber;
    @Output() invalidValueSet = new EventEmitter();
    protected el: HTMLInputElement;

    constructor(protected element: ElementRef, protected renderer: Renderer2) {
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
