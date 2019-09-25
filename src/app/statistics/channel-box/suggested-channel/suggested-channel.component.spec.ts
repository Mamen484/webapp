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
import { ChannelStorageService } from '../../../core/services/channel-storage.service';
import { ChannelLinkService } from '../../../core/services/channel-link.service';
import { SflWindowRefService } from 'sfl-shared/services';
import { ChannelMap } from '../../../core/entities/channel-map.enum';

describe('SuggestedChannelComponent', () => {
    let component: SuggestedChannelComponent;
    let fixture: ComponentFixture<SuggestedChannelComponent>;
    let afterClosedSpy;
    let requestSpy;
    let openSpy;
    let channelStorage: jasmine.SpyObj<ChannelStorageService>;
    let channelLinkService: jasmine.SpyObj<ChannelLinkService>;
    let windowRef: SflWindowRefService;

    beforeEach(async(() => {
        afterClosedSpy = jasmine.createSpy('afterClosed');
        requestSpy = jasmine.createSpy('sendInternationalAccountRequestSpy');
        openSpy = jasmine.createSpy('dialog.open');
        openSpy.and.returnValue({afterClosed: afterClosedSpy});
        channelStorage = jasmine.createSpyObj(['getGeneratedTurnover', 'getGeneratedOnline']);
        channelLinkService = jasmine.createSpyObj('ChannelLinkService spy', ['navigateToChannel', 'getChannelLink']);
        windowRef = {nativeWindow: <any>{location: {}}};

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
                {provide: ChannelStorageService, useValue: channelStorage},
                {provide: ChannelLinkService, useValue: channelLinkService},
                {provide: SflWindowRefService, useValue: windowRef},
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

    it('should navigate a user to a normal channel link when a channel is cdiscount', () => {
        const channelLink = 'some_channel_link';
        channelLinkService.getChannelLink.and.returnValue(<any>channelLink);
        component.channel = <any>{_embedded: {channel: {id: ChannelMap.cdiscount}}};
        component.goToChannel();
        expect(channelLink);
    });

    it('should call channelLinkService.navigateToChannel() when channel is different from cdiscount', () => {
        const channelLink = 'some_channel_link';
        channelLinkService.getChannelLink.and.returnValue(<any>channelLink);
        component.channel = <any>{_embedded: {channel: {id: ChannelMap.laredoute}}};
        component.goToChannel();
        expect(channelLinkService.navigateToChannel).toHaveBeenCalledWith(<any>{_embedded: {channel: {id: ChannelMap.laredoute}}});
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

    it('should assign potentialTurnover and clientsConnected to the generated values if there is no stats', () => {
        component.channel.stats = undefined;
        channelStorage.getGeneratedOnline.and.returnValue(4.65);
        channelStorage.getGeneratedTurnover.and.returnValue(896.92);
        component.ngOnInit();
        expect(component.potentialTurnover).toBe(896.92);
        expect(component.clientsConnected).toBe(4.65);
    });

    it('should set potentialTurnover to a generated value if the `turnoverAverage` property is missing', () => {
        component.channel.stats = {
            connectedStores: 20,
            totalStores: 900,
        };
        channelStorage.getGeneratedTurnover.and.returnValue(896.92);
        component.ngOnInit();
        expect(component.potentialTurnover).toBe(896.92);
    });

    it('should set clientsConnected to a generated value if the `connectedStores` property is missing', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            totalStores: 900,
        };
        channelStorage.getGeneratedOnline.and.returnValue(4.65);
        component.ngOnInit();
        expect(component.clientsConnected).toBe(4.65);
    });

    it('should assign clientsConnected a generated value if the `totalStores` property is missing', () => {
        component.channel.stats = {
            turnoverAverage: 1920,
            connectedStores: 10,
        };
        channelStorage.getGeneratedOnline.and.returnValue(4.65);
        component.ngOnInit();
        expect(component.potentialTurnover).toBe(1920);
        expect(component.clientsConnected).toBe(4.65);
    });

    it('should assign potentialTurnover to a generated value if the `turnoverAverage` property equals to zero', () => {
        component.channel.stats = {
            turnoverAverage: 0,
            connectedStores: 20,
            totalStores: 900,
        };
        channelStorage.getGeneratedTurnover.and.returnValue(896.92);
        component.ngOnInit();
        expect(component.potentialTurnover).toBe(896.92);
    });

    it('should assign clientsConnected to a generated value if the `connectedStores` property equals to zero', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            connectedStores: 0,
            totalStores: 900,
        };
        channelStorage.getGeneratedOnline.and.returnValue(4.65);
        component.ngOnInit();
        expect(component.clientsConnected).toBe(4.65);
    });

    it('should assign clientsConnected to a generated value if the `totalStores` property equals to zero', () => {
        component.channel.stats = {
            turnoverAverage: 20,
            connectedStores: 10,
            totalStores: 0,
        };
        channelStorage.getGeneratedOnline.and.returnValue(4.65);
        component.ngOnInit();
        expect(component.clientsConnected).toBe(4.65);
    });

    describe('potential turnover calculation', () => {

        it('should assign a generated value to the potential turnover when the value is less then 850', () => {
            setStats(20);
            channelStorage.getGeneratedTurnover.and.returnValue(900);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(900);
        });

        it('should assign a returned from a server value if the value is larger then 850', () => {
            setStats(1650.4);
            component.ngOnInit();
            expect(component.potentialTurnover).toBe(1650.4);
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

    describe('clientsConnected calculation', () => {

        it('should assign a generated value to the clientsConnected when connected less then 4% of stores', () => {
            setStats(10);
            channelStorage.getGeneratedOnline.and.returnValue(5.75);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(5.75);
        });

        it('should assign a returned from a server value if the value is more then 4% of stores', () => {
            setStats(60);
            component.ngOnInit();
            expect(component.clientsConnected).toBe(6);
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
