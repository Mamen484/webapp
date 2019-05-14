import { SflLegacyLinkDirective } from './legacy-link.directive';
import { ElementRef } from '@angular/core';
import { SflLegacyLinkService } from 'sfl-shared/services';

describe('LegacyLinkDirective', () => {
    let elementRef: ElementRef;
    let legacyLink: jasmine.SpyObj<SflLegacyLinkService>;
    let directive: SflLegacyLinkDirective;


    beforeEach(() => {
        elementRef = {nativeElement: {}};
        legacyLink = jasmine.createSpyObj(['getLegacyLink']);
        directive = new SflLegacyLinkDirective(elementRef, <any>legacyLink);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass correct args to legacy link service', () => {
        directive.path = '/';
        directive.storeId = 22;
        directive.ngOnChanges({});
        expect(legacyLink.getLegacyLink.calls.mostRecent().args[0]).toEqual('/');
        expect((<any>legacyLink.getLegacyLink.calls.mostRecent().args[1]).store).toEqual(22);
    });
});
