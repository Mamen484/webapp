import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[sfLegacyLink]'
})
export class LegacyLinkStubDirective {
    @Input() path = '';
}