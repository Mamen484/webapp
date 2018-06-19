import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguredChannelComponent } from './configured-channel.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { LargeNumberSuffixPipe } from '../../shared/large-number-suffix.pipe';

describe('ConfiguredChannelComponent', () => {
    let component: ConfiguredChannelComponent;
    let fixture: ComponentFixture<ConfiguredChannelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfiguredChannelComponent, SfCurrencyPipe, LargeNumberSuffixPipe],
            schemas: [NO_ERRORS_SCHEMA]
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
        component.channel.statistics.currency = 'EUR';
        fixture.detectChanges();
        expect(element('.channel-revenue span').textContent.trim()).toEqual('22,00 €');
    });

    it('should display channel revenue if it equals 0', () => {
        component.channel = <any>mockChannel();
        component.hasStatisticsPermission = true;
        component.channel.statistics.revenue = 0;
        component.channel.statistics.currency = 'EUR';
        fixture.detectChanges();
        expect(element('.channel-revenue span').textContent.trim()).toEqual('0,00 €');
    });

    it('should NOT display channel revenue a store does not have statistics permission', () => {
        component.channel = <any>mockChannel();
        component.hasStatisticsPermission = false;
        component.channel.statistics.revenue = 22;
        component.channel.statistics.currency = 'EUR';
        fixture.detectChanges();
        expect(element('.channel-revenue')).toBeNull();
    });

    it('should display `unavailable` if revenue is NOT in the response', () => {
        component.channel = <any>mockChannel();
        component.hasStatisticsPermission = true;
        expect(component.channel.statistics.revenue).not.toBeDefined();
        fixture.detectChanges();
        expect(element('.channel-revenue').textContent.trim()).toContain('Unavailable');
    });

    it('should display channel selected issues if it is in the response', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 129092;
        fixture.detectChanges();
        expect(element('.channel-checked span').textContent.trim()).toEqual('129.09K checked');
    });

    it('should display channel selected issues if it equals 0', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 0;
        fixture.detectChanges();
        expect(element('.channel-checked span').textContent.trim()).toEqual('0 checked');
    });

    it('should display `unavailable` if selected is NOT in the response', () => {
        component.channel = <any>mockChannel();
        expect(component.channel.statistics.selected).not.toBeDefined();
        fixture.detectChanges();
        expect(element('.channel-checked').textContent.trim()).toContain('Unavailable');
    });

    it('should display channel export issues if selected and exported is in the response', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 1290920;
        component.channel.statistics.exported = 1000;
        fixture.detectChanges();
        expect(element('.channel-issues span').textContent.trim()).toEqual('1.29M issues');
    });

    it('should display channel export issues if selected or exported is 0', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 0;
        component.channel.statistics.exported = 0;
        fixture.detectChanges();
        expect(element('.channel-issues span').textContent.trim()).toEqual('0 issues');
    });

    it('should display `unavailable` instead of number of issues if selected is NOT in the response', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.exported = 1000;
        fixture.detectChanges();
        expect(element('.channel-issues').textContent.trim()).toContain('Unavailable');
    });

    it('should display `unavailable` instead of number of issues if exported is NOT in the response', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics.selected = 1000;
        fixture.detectChanges();
        expect(element('.channel-issues').textContent.trim()).toContain('Unavailable');
    });

    it('should NOT fails is statistics is not defined at all', () => {
        component.channel = <any>mockChannel();
        component.channel.statistics = undefined;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    function mockChannel() {
        return {
            _embedded: {
                channel: {
                    _links: {image: {href: ''}},
                    name: 'channel name'
                }
            },
            statistics: {}
        }
    }

    function element(selector) {
        return fixture.debugElement.nativeElement.querySelector(selector);
    }
});

