import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguredChannelComponent } from './configured-channel.component';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { LargeNumberSuffixPipe } from '../../../shared/large-number-suffix.pipe';
import { ChannelBoxComponent } from '../channel-box.component';
import { ChannelTurnoverComponent } from '../channel-turnover/channel-turnover.component';
import { ChannelOnlineComponent } from '../channel-online/channel-online.component';
import { StatsUnavailableComponent } from '../stats-unavailable/stats-unavailable.component';
import { BlankPipe } from '../../../orders/order-details/items-table/items-table.component.spec';
import { FeedService } from '../../../core/services/feed.service';
import { LegacyLinkService } from '../../../core/services/legacy-link.service';
import { Router } from '@angular/router';
import { SflWindowRefService } from 'sfl-shared/services';
import { of } from 'rxjs';

describe('ConfiguredChannelComponent', () => {
    let component: ConfiguredChannelComponent;
    let fixture: ComponentFixture<ConfiguredChannelComponent>;

    let feedService: jasmine.SpyObj<FeedService>;
    let router: jasmine.SpyObj<Router>;
    let legacyLinkService: jasmine.SpyObj<LegacyLinkService>;


    beforeEach(async(() => {

        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection', 'fetchCategoryCollection']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        legacyLinkService = jasmine.createSpyObj('LegacyLinkService', ['getLegacyLink']);


        TestBed.configureTestingModule({
            declarations: [
                ConfiguredChannelComponent,
                SfCurrencyPipe,
                LargeNumberSuffixPipe,
                ChannelBoxComponent,
                ChannelTurnoverComponent,
                ChannelOnlineComponent,
                StatsUnavailableComponent,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: FeedService, useValue: feedService},
                {provide: Router, useValue: router},
                {provide: LegacyLinkService, useValue: legacyLinkService},
                {provide: SflWindowRefService, useValue: {nativeWindow: {location: {}}}},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfiguredChannelComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.channel = <any>mockChannel();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('Should display channel revenue if it is in the response', () => {
        component.channel = <any>mockChannel();
        component.hasStatisticsPermission = true;
        component.channel.statistics.revenue = 22;
        component.channel.statistics.currency = 'USD';
        fixture.detectChanges();
        expect(element('.channel-turnover span').textContent.trim()).toEqual('22');
    });

    it('should display channel revenue if it equals 0', () => {
        component.channel = <any>mockChannel();
        component.hasStatisticsPermission = true;
        component.channel.statistics.revenue = 0;
        component.channel.statistics.currency = 'USD';
        fixture.detectChanges();
        expect(element('.channel-turnover span').textContent.trim()).toEqual('0');
    });

    it('should NOT display channel revenue a store does not have statistics permission', () => {
        component.channel = <any>mockChannel();
        component.hasStatisticsPermission = false;
        component.channel.statistics.revenue = 22;
        component.channel.statistics.currency = 'EUR';
        fixture.detectChanges();
        expect(element('.channel-turnover').textContent.trim()).toContain('--');
    });

    it('should display `unavailable` if revenue is NOT in the response', () => {
        component.channel = <any>mockChannel();
        component.hasStatisticsPermission = true;
        expect(component.channel.statistics.revenue).not.toBeDefined();
        fixture.detectChanges();
        expect(element('.channel-turnover').textContent.trim()).toContain('--');
    });

    it('should display online products if selected and exported is in the response', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 1290920;
        component.channel.statistics.exported = 1000;
        fixture.detectChanges();
        expect(element('.channel-online span').textContent.trim()).toEqual('0%');
    });

    it('should display online products if selected and exported is in the response', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 1290920;
        component.channel.statistics.exported = 700000;
        fixture.detectChanges();
        expect(element('.channel-online span').textContent.trim()).toEqual('54%');
    });

    it('should add `online-low` class when the number of products online is not higher than 30%', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 100;
        component.channel.statistics.exported = 30;
        fixture.detectChanges();
        expect(element('.channel-online span').textContent.trim()).toEqual('30%');
        expect(element('sf-channel-online').className).toContain('online-low')
    });

    it('should add `online-middle` class when the number of products online is higher than 30% but lower than 75%', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 100;
        component.channel.statistics.exported = 74;
        fixture.detectChanges();
        expect(element('.channel-online span').textContent.trim()).toEqual('74%');
        expect(element('sf-channel-online').className).toContain('online-middle')
    });

    it('should add `online-low` class when the number of products online is not lower than 75%', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 100;
        component.channel.statistics.exported = 75;
        fixture.detectChanges();
        expect(element('.channel-online span').textContent.trim()).toEqual('75%');
        expect(element('sf-channel-online').className).toContain('online-high')
    });

    it('should display channel online if exported is 0', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 12000;
        component.channel.statistics.exported = 0;
        fixture.detectChanges();
        expect(element('.channel-online span').textContent.trim()).toEqual('0%');
    });

    it('should display channel online `unavailable` if selected is 0', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 0;
        component.channel.statistics.exported = 0;
        fixture.detectChanges();
        expect(element('.channel-online').textContent.trim()).toEqual('--');
    });

    it('should display `unavailable` instead of number of issues if selected is NOT in the response', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.exported = 1000;
        fixture.detectChanges();
        expect(element('.channel-online').textContent.trim()).toContain('--');
    });

    it('should display `unavailable` instead of number of issues if exported is NOT in the response', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 1000;
        fixture.detectChanges();
        expect(element('.channel-online').textContent.trim()).toContain('--');
    });

    it('should NOT fails is statistics is not defined at all', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics = undefined;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('goToChannelLink()', () => {
        it('should open a legacy channel page if the feed has configured categories', () => {
            feedService.fetchFeedCollection.and.returnValue(of({_embedded: {feed: [{id: 20}]}}));
            feedService.fetchCategoryCollection.and.returnValue(of({_embedded: {category: [{}]}}));
            component.channel = <any>mockChannel();
            legacyLinkService.getLegacyLink.and.returnValue('/some-link');
            component.goToChannelLink();
            expect(legacyLinkService.getLegacyLink).toHaveBeenCalledWith('/shopbot/manage/channel_name');
            expect(fixture.debugElement.injector.get(SflWindowRefService).nativeWindow.location.href).toBe('/some-link');
        });

        it('should open channel setup page if the feed has no configured categories', () => {
            feedService.fetchFeedCollection.and.returnValue(of({_embedded: {feed: [{id: 20}]}}));
            feedService.fetchCategoryCollection.and.returnValue(of({_embedded: {category: []}}));
            component.channel = <any>mockChannel();
            component.channel._embedded.channel.id = 12;
            component.goToChannelLink();
            expect(router.navigate).toHaveBeenCalledWith(['/channel-setup', 12, 20]);
        });
    });

    function mockChannel() {
        return {
            _embedded: {
                channel: {
                    _links: {image: {href: ''}},
                    name: 'channel_name',
                    type: 'shopbot'
                }
            },
            statistics: {}
        }
    }

    function element(selector) {
        return fixture.debugElement.nativeElement.querySelector(selector);
    }
});

@Pipe({name: 'sfCurrency'})
class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
