import { SflWebappLinkDirective } from './webapp-link.directive';
import { ElementRef } from '@angular/core';
import { SflWebappLinkService } from 'sfl-shared/services';
import { HttpParams } from '@angular/common/http';

it('should call the webappLinkService.setLink() on ngOnChanges()', () => {
    const elementRef: ElementRef = <any>{};
    const webAppLinkService: jasmine.SpyObj<SflWebappLinkService> = jasmine.createSpyObj(['setLink']);
    const directive = new SflWebappLinkDirective(elementRef, webAppLinkService);
    directive.ngOnChanges({});
    expect(webAppLinkService.setLink).toHaveBeenCalled();
});


it('should call the webappLinkService.setLink() with params when set on ngOnChanges()', () => {
    const elementRef: ElementRef = <any>{};
    const webAppLinkService: jasmine.SpyObj<SflWebappLinkService> = jasmine.createSpyObj(['setLink']);
    const directive = new SflWebappLinkDirective(elementRef, webAppLinkService);
    directive.storeId = 232;
    directive.path = '/channels/all';
    directive.hash = 'some-hash';
    directive.ngOnChanges({});
    expect(webAppLinkService.setLink).toHaveBeenCalledWith(<any>{}, '/channels/all', new HttpParams().set('store', '232'), 'some-hash');
});
