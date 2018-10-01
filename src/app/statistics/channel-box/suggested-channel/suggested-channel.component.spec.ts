import { of, throwError } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatDialog } from '@angular/material';
import { SuggestedChannelComponent } from './suggested-channel.component';
import { InternationalAccountService } from '../../../core/services/international-account.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { IntlRequestSuccessDialogComponent } from '../../intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from '../../request-failed-dialog/request-failed-dialog.component';
import { LegacyLinkStubDirective } from '../../../../mocks/stubs/legacy-link-stub.directive';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { BlankPipe } from '../../../orders/order-details/items-table/items-table.component.spec';

describe('SuggestedChannelComponent', () => {
    let component: SuggestedChannelComponent;
    let fixture: ComponentFixture<SuggestedChannelComponent>;
    let afterClosedSpy;
    let requestSpy;
    let openSpy;

    beforeEach(async(() => {
        afterClosedSpy = jasmine.createSpy('afterClosed');
        requestSpy = jasmine.createSpy('sendInternationalAccountRequestSpy');
        openSpy = jasmine.createSpy('dialog.open');
        openSpy.and.returnValue({afterClosed: afterClosedSpy});

        TestBed.configureTestingModule({
            imports: [MatCardModule, MatButtonModule, InfiniteScrollModule],
            declarations: [SuggestedChannelComponent, LegacyLinkStubDirective, SfCurrencyPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: {open: openSpy}},
                {
                    provide: InternationalAccountService,
                    useValue: {sendInternationalAccountRequest: requestSpy}
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuggestedChannelComponent);
        component = fixture.componentInstance;
        component.channel = <any>{_links: {image: {href: ''}}, name: '', _embedded: {channel: {_links: {image: ''}}}};
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should not send international account request when user did not agree for that', () => {
        afterClosedSpy.and.returnValue(of(false));
        component.showInternationalChannelDialog();
        expect(requestSpy).not.toHaveBeenCalled();
    });

    it('should send international account request when user agreed for that', () => {
        afterClosedSpy.and.returnValue(of(true));
        requestSpy.and.returnValue(of({}));
        component.showInternationalChannelDialog();
        expect(requestSpy).toHaveBeenCalled();
    });

    it('should open success dialog when the server returned success', () => {
        afterClosedSpy.and.returnValue(of(true));
        requestSpy.and.returnValue(of({}));
        component.showInternationalChannelDialog();
        expect(openSpy).toHaveBeenCalledWith(IntlRequestSuccessDialogComponent);
    });

    it('should open fail dialog when the server returned an error', () => {
        afterClosedSpy.and.returnValue(of(true));
        requestSpy.and.returnValue(throwError({}));
        component.showInternationalChannelDialog();
        expect(openSpy).toHaveBeenCalledWith(RequestFailedDialogComponent);
    });

    it('should set setStats to true if there are properties `turnoverAverage`, `connectedStores` and `totalStores`', () => {
        component.channel.stats = {
            turnoverAverage: 100,
            connectedStores: 20,
            totalStores: 900,
        };
        component.ngOnInit();
        expect(component.hasStats).toBe(true);
    });

    it('should set setStats to false if the store does not have stats', () => {
        component.channel.stats = undefined;
        component.ngOnInit();
        expect(component.hasStats).toBe(false);
    });

    it('should set setStats to false if the `turnoverAverage` property is missing', () => {
        component.channel.stats = {
            connectedStores: 20,
            totalStores: 900,
        };
        component.ngOnInit();
        expect(component.hasStats).toBe(false);
    });

    it('should set setStats to false if the `connectedStores` property is missing', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            totalStores: 900,
        };
        component.ngOnInit();
        expect(component.hasStats).toBe(false);
    });

    it('should set setStats to false if the `totalStores` property is missing', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            connectedStores: 10,
        };
        component.ngOnInit();
        expect(component.hasStats).toBe(false);
    });

    it('should set setStats to false if the `turnoverAverage` property equals to zero', () => {
        component.channel.stats = {
            turnoverAverage: 0,
            connectedStores: 20,
            totalStores: 900,
        };
        component.ngOnInit();
        expect(component.hasStats).toBe(false);
    });

    it('should set setStats to false if the `connectedStores` property equals to zero', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            connectedStores: 0,
            totalStores: 900,
        };
        component.ngOnInit();
        expect(component.hasStats).toBe(false);
    });

    it('should set setStats to false if the `totalStores` property equals to zero', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            connectedStores: 10,
            totalStores: 0,
        };
        component.ngOnInit();
        expect(component.hasStats).toBe(false);
    });

    it('should calculate a correct value of clientsConnected', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            connectedStores: 92,
            totalStores: 1000,
        };
        component.ngOnInit();
        expect(component.clientsConnected).toBe(10);
    });
});

@Pipe({name: 'sfCurrency'})
class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
