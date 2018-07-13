import { LegacyLinkDirective } from './legacy-link.directive';
import { ElementRef } from '@angular/core';
import { LegacyLinkService } from '../core/services/legacy-link.service';

describe('LegacyLinkDirective', () => {
    let elementRef: ElementRef;
    let legacyLink: jasmine.SpyObj<LegacyLinkService>;
    let directive: LegacyLinkDirective;


    beforeEach(() => {
        elementRef = {nativeElement: {}};
        legacyLink = jasmine.createSpyObj(['getLegacyLink']);
        directive = new LegacyLinkDirective(elementRef, legacyLink);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should pass correct args to legacy link service', () => {
        directive.path = '/';
        directive.storeId = 22;
        directive.ngOnChanges({});
        expect(legacyLink.getLegacyLink.calls.mostRecent().args[0]).toEqual('/');
        expect(legacyLink.getLegacyLink.calls.mostRecent().args[1].store).toEqual(22);
    });
});
