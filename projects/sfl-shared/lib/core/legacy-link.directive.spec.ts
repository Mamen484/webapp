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

    it('should pass correct args to legacy link service if the store is not specified', () => {
        directive.path = '/';
        directive.ngOnChanges({});
        expect(legacyLink.getLegacyLink.calls.mostRecent().args[0]).toEqual('/');
        expect((<any>legacyLink.getLegacyLink.calls.mostRecent().args[1]).store).not.toBeDefined();
    });

    it('should NOT add hash to the link when NOT specified', () => {
        directive.path = '/';
        legacyLink.getLegacyLink.and.returnValue('/tools/infos?token=123456&store=123');
        directive.ngOnChanges({});
        expect(elementRef.nativeElement.href).toBe('/tools/infos?token=123456&store=123');
    });

    it('should add hash to the link when specified', () => {
        directive.path = '/';
        directive.hash = 'someHash';
        legacyLink.getLegacyLink.and.returnValue('/tools/infos?token=123456&store=123');
        directive.ngOnChanges({});
        expect(elementRef.nativeElement.href).toBe('/tools/infos?token=123456&store=123#someHash');
    });
});
