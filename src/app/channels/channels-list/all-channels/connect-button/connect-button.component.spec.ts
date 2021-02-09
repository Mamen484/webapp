import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { ConnectButtonComponent } from './connect-button.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/entities/app-state';
import { MatDialog } from '@angular/material/dialog';
import { InternationalAccountService } from '../../../../core/services/international-account.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { IntlRequestSuccessDialogComponent } from './intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from './request-failed-dialog/request-failed-dialog.component';

describe('ConnectButtonComponent', () => {
    let component: ConnectButtonComponent;
    let fixture: ComponentFixture<ConnectButtonComponent>;
    let store: jasmine.SpyObj<Store<AppState>>;
    let matDialog: jasmine.SpyObj<MatDialog>;
    let internationalAccountService: jasmine.SpyObj<InternationalAccountService>;

    beforeEach(async () => {
        store = jasmine.createSpyObj(['select']);
        matDialog = jasmine.createSpyObj(['open']);
        internationalAccountService = jasmine.createSpyObj(['sendInternationalAccountRequest']);
        await TestBed.configureTestingModule({
            declarations: [ConnectButtonComponent, ChannelLinkPipe],
            providers: [
                {provide: Store, useValue: store},
                {provide: MatDialog, useValue: matDialog},
                {provide: InternationalAccountService, useValue: internationalAccountService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConnectButtonComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set shopifyUSUser to false if no country specified', () => {
        store.select.and.returnValue(of({feed: {source: 'Shopify'}, planName: 'none'}));
        fixture.detectChanges();
        expect(component.shopifyUSUser).toBe(false);
    });


    it('should set shopifyUSUser to true if the store.country is us, feed.source is shopify and planName is none', () => {
        store.select.and.returnValue(of({country: 'US', feed: {source: 'Shopify'}, planName: 'none'}));
        fixture.detectChanges();
        expect(component.shopifyUSUser).toBe(true);
    });

    it('should set shopifyUSUser to false if the store.country is NOT us', () => {
        store.select.and.returnValue(of({country: 'FR', feed: {source: 'Shopify'}, planName: 'none'}));
        fixture.detectChanges();
        expect(component.shopifyUSUser).toBe(false);
    });

    it('should set shopifyUSUser to false if feed.source is NOT shopify ', () => {
        store.select.and.returnValue(of({country: 'US', feed: {source: 'not shopify'}, planName: 'none'}));
        fixture.detectChanges();
        expect(component.shopifyUSUser).toBe(false);
    });

    it('should set shopifyUSUser to false if the planName is NOT none', () => {
        store.select.and.returnValue(of({country: 'US', feed: {source: 'Shopify'}, planName: 'some plan'}));
        fixture.detectChanges();
        expect(component.shopifyUSUser).toBe(false);
    });


    it('should not send international account request when user did not agree for that', () => {
        const afterClosed = jasmine.createSpy();
        matDialog.open.and.returnValue(<any>{afterClosed});
        afterClosed.and.returnValue(of(false));
        component.showInternationalChannelDialog();
        expect(internationalAccountService.sendInternationalAccountRequest).not.toHaveBeenCalled();
    });

    it('should send international account request when user agreed for that', () => {
        const afterClosed = jasmine.createSpy();
        matDialog.open.and.returnValue(<any>{afterClosed});
        afterClosed.and.returnValue(of(true));
        internationalAccountService.sendInternationalAccountRequest.and.returnValue(of({}));
        component.showInternationalChannelDialog();
        expect(internationalAccountService.sendInternationalAccountRequest).toHaveBeenCalled();
    });

    it('should open success dialog when the server returned success', () => {
        const afterClosed = jasmine.createSpy();
        matDialog.open.and.returnValue(<any>{afterClosed});
        afterClosed.and.returnValue(of(true));
        internationalAccountService.sendInternationalAccountRequest.and.returnValue(of({}));
        component.showInternationalChannelDialog();
        expect(matDialog.open).toHaveBeenCalledWith(IntlRequestSuccessDialogComponent);
    });

    it('should open fail dialog when the server returned an error', () => {
        const afterClosed = jasmine.createSpy();
        matDialog.open.and.returnValue(<any>{afterClosed});
        afterClosed.and.returnValue(of(true));
        internationalAccountService.sendInternationalAccountRequest.and.returnValue(throwError({}));
        component.showInternationalChannelDialog();
        expect(matDialog.open).toHaveBeenCalledWith(RequestFailedDialogComponent);
    });

    it('should set internationalMode to true if the currentCountry and store.country differ', () => {
        store.select.and.returnValue(of({country: 'US', feed: {source: 'Shopify'}, planName: 'some plan'}));
        component.currentCountry = 'fr';
        fixture.detectChanges();
        expect(component.internationalMode).toBe(true);
    });

    it('should set internationalMode to false if the currentCountry and store.country equal', () => {
        store.select.and.returnValue(of({country: 'US', feed: {source: 'Shopify'}, planName: 'some plan'}));
        component.currentCountry = 'us';
        fixture.detectChanges();
        expect(component.internationalMode).toBe(false);
    });
});

@Pipe({
    name: 'sfChannelLink'
})
class ChannelLinkPipe implements PipeTransform {
    transform() {
    }
}
