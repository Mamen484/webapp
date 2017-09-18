import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[routerLink], [routerLinkActive]'
})
export class DummyRouterDirective {
    @Input() routerLink;
    @Input() routerLinkActive;
}