import { Component, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[sf-detect-autofill]',
    template: '',
    styles: [`
        @keyframes onAutoFillStart {
            from {}
            to {}
        }
        :host:-webkit-autofill {
            animation-name: onAutoFillStart;
            transition: background-color 50000s ease-in-out 0s;

        }
    `]
})
export class DetectAutofillComponent {

    @Output() autofilled = new EventEmitter();

    constructor() {
    }
    @HostListener('animationstart') onAnimationStart = () => {
        this.autofilled.emit();
    }
}
