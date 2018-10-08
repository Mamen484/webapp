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

    it('should assign potentialTurnover and clientsConnected to the minimum values if there is no stats', () => {
        component.channel.stats = undefined;
        component.ngOnInit();
        expect(component.potentialTurnover).toBe(500);
        expect(component.clientsConnected).toBe(5);
    });

    it('should set potentialTurnover to the minimum value if the `turnoverAverage` property is missing', () => {
        component.channel.stats = {
            connectedStores: 20,
            totalStores: 900,
        };
        component.ngOnInit();
        expect(component.potentialTurnover).toBe(500);
    });

    it('should set clientsConnected to the minimmum value if the `connectedStores` property is missing', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            totalStores: 900,
        };
        component.ngOnInit();
        expect(component.clientsConnected).toBe(5);
    });

    it('should assign potentialTurnover and clientsConnected to the minimum values if the `totalStores` property is missing', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            connectedStores: 10,
        };
        component.ngOnInit();
        expect(component.potentialTurnover).toBe(500);
        expect(component.clientsConnected).toBe(5);
    });

    it('should assign potentialTurnover to the minimum value if the `turnoverAverage` property equals to zero', () => {
        component.channel.stats = {
            turnoverAverage: 0,
            connectedStores: 20,
            totalStores: 900,
        };
        component.ngOnInit();
        expect(component.potentialTurnover).toBe(500);
    });

    it('should assign clientsConnected to the minimum value if the `connectedStores` property equals to zero', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            connectedStores: 0,
            totalStores: 900,
        };
        component.ngOnInit();
        expect(component.clientsConnected).toBe(5);
    });

    it('should assign clientsConnected to the minimum value if the `totalStores` property equals to zero', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            connectedStores: 10,
            totalStores: 0,
        };
        component.ngOnInit();
        expect(component.clientsConnected).toBe(5);
    });

    describe('potential turnover calculation', () => {

        it('should assign 500 to the potential turnover when the value is less then 500', () => {
            setStats(20);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(500);
        });

        it('should assign 500 to the potential turnover when the value is less then 1000', () => {
            setStats(650.4);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(500);
        });

        it('should assign 1000 to the potential turnover when the value is less then 2500', () => {
            setStats(1228.989879);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(1000);
        });

        it('should assign 2.5000 to the potential turnover when the value is less then 5000', () => {
            setStats(2500);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(2500);
        });

        it('should assign 5000 to the potential turnover when the value is less then 10000', () => {
            setStats(5200);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(5000);
        });

        it('should assign 10000 to the potential turnover when the value is less then 25000', () => {
            setStats(24999.99);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(10000);
        });

        it('should assign 25000 to the potential turnover when the value is less then 50000', () => {
            setStats(25000);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(25000);
        });

        it('should assign 50000 to the potential turnover when the value is less then 100000', () => {
            setStats(67890);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(50000);
        });

        it('should assign 100000 to the potential turnover when the value is more then 100000', () => {
            setStats(120000);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(100000);
        });

        it('should assign 100000 to the potential turnover when the value is much more then 100000', () => {
            setStats(31120000);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(100000);
        });

        function setStats(turnoverAverage) {
            component.channel.stats = {
                turnoverAverage,
                connectedStores: 92,
                totalStores: 1000,
            };
            component.ngOnInit();
        }
    });

    describe('potential turnover calculation', () => {

        it('should assign 5 to the clientsConnected when connected less then 5% of stores', () => {
            setStats(20);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(5);
        });

        it('should assign 5 to the clientsConnected when connected less then 10% of stores', () => {
            setStats(90);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(5);
        });

        it('should assign 10 to the clientsConnected when connected exactly 10% of stores', () => {
            setStats(100);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(10);
        });

        it('should assign 10 to the clientsConnected when connected less then 20% of stores', () => {
            setStats(160);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(10);
        });

        it('should assign 20 to the clientsConnected when connected less then 30% of stores', () => {
            setStats(275);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(20);
        });

        it('should assign 30 to the clientsConnected when connected less then 40% of stores', () => {
            setStats(344);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(30);
        });

        it('should assign 40 to the clientsConnected when connected less then 50% of stores', () => {
            setStats(499);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(40);
        });

        it('should assign 50 to the clientsConnected when connected less then 60% of stores', () => {
            setStats(511);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(50);
        });

        it('should assign 60 to the clientsConnected when connected less then 70% of stores', () => {
            setStats(637);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(60);
        });

        it('should assign 70 to the clientsConnected when connected less then 80% of stores', () => {
            setStats(739);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(70);
        });

        it('should assign 80 to the clientsConnected when connected less then 90% of stores', () => {
            setStats(890);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(80);
        });

        it('should assign 90 to the clientsConnected when connected less then 100% of stores', () => {
            setStats(920);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(90);
        });

        function setStats(connected) {
            component.channel.stats = {
                turnoverAverage: 1000,
                connectedStores: connected,
                totalStores: 1000,
            };
            component.ngOnInit();
        }
    });
});

@Pipe({name: 'sfCurrency'})
class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
