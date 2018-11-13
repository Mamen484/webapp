import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { SflLocalStorageService, SflUserService } from 'sfl-shared/services';
import { SflWindowRefService } from 'sfl-shared/services';
import { TimelineService } from '../core/services/timeline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { MatMenuModule } from '@angular/material';
import { PaymentType } from 'sfl-shared/entities';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreStatus } from 'sfl-shared/entities';
import { AggregatedUserInfo } from 'sfl-shared/entities';

describe('MenuComponent', () => {

    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    let appStore: jasmine.SpyObj<Store<AppState>>;
    let localStorage: jasmine.SpyObj<SflLocalStorageService>;
    let userService: jasmine.SpyObj<SflUserService>;
    let windowRef: SflWindowRefService;
    let timelineService: jasmine.SpyObj<TimelineService>;
    let route: ActivatedRoute;
    let router: Router;

    beforeEach(() => {
        appStore = jasmine.createSpyObj(['select']);
        localStorage = jasmine.createSpyObj(['removeItem']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        windowRef = {nativeWindow: <any>{}};
        timelineService = jasmine.createSpyObj(['emitUpdatedTimeline', 'getUpdatesNumber']);
        route = <any>{};
        router = <any>{routeReuseStrategy: {shouldDetach: jasmine.createSpy('shouldDetach'), navigate: jasmine.createSpy('navigate')}};
        TestBed.configureTestingModule({
            declarations: [MenuComponent, LegacyLinkDirective],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: SflLocalStorageService, useValue: localStorage},
                {provide: SflUserService, useValue: userService},
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: TimelineService, useValue: timelineService},
                {provide: ActivatedRoute, useValue: route},
                {provide: Router, useValue: router},
            ],
            imports: [MatMenuModule, NoopAnimationsModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        timelineService.getUpdatesNumber.and.returnValue(EMPTY);

        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display `Membership` link when facturation permission exists', () => {
        appStore.select.and.returnValue(of({permission: {facturation: '*'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create(
            {roles: ['user'], _embedded: {store: []}}
        )));
        fixture.detectChanges();
        openAccountMenu();
        expect(membershipElement()).toBeTruthy();
        expect(membershipElement().textContent).toEqual('Membership');
    });

    it('should NOT display `Membership` link when facturation permission does not exist', () => {
        appStore.select.and.returnValue(of({permission: {}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], _embedded: {store: []}})));
        fixture.detectChanges();
        openAccountMenu();
        expect(membershipElement()).toBeNull();
    });


    it('should display `Membership link` when paymentType is credit_card', () => {
        appStore.select.and.returnValue(of({permission: {facturation: '*'}, paymentType: PaymentType.creditCard}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], _embedded: {store: []}})));
        fixture.detectChanges();
        openAccountMenu();
        expect(component.currentStore.paymentType).toEqual(PaymentType.creditCard);
        expect(membershipElement()).toBeTruthy();
        expect(membershipElement().textContent).toEqual('Membership');
    });

    it('should display `Membership link` when paymentType is bank_transfer', () => {
        appStore.select.and.returnValue(of({permission: {facturation: '*'}, paymentType: PaymentType.bankTransfer}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], _embedded: {store: []}})));
        fixture.detectChanges();
        openAccountMenu();
        expect(component.currentStore.paymentType).toEqual(PaymentType.bankTransfer);
        expect(membershipElement()).toBeTruthy();
        expect(membershipElement().textContent).toEqual('Membership');
    });

    it('should display `Membership link` when paymentType is sepa', () => {
        appStore.select.and.returnValue(of({permission: {facturation: '*'}, paymentType: PaymentType.sepa}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], _embedded: {store: []}})));
        fixture.detectChanges();
        openAccountMenu();
        expect(component.currentStore.paymentType).toEqual(PaymentType.sepa);
        expect(membershipElement()).toBeTruthy();
        expect(membershipElement().textContent).toEqual('Membership');
    });

    it('should display `Membership link` when paymentType is `other`', () => {
        appStore.select.and.returnValue(of({permission: {facturation: '*'}, paymentType: PaymentType.other}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], _embedded: {store: []}})));
        fixture.detectChanges();
        openAccountMenu();
        expect(component.currentStore.paymentType).toEqual(PaymentType.other);
        expect(membershipElement()).toBeNull();
    });

    it('should display correct links to legacy stores for a multistore user', () => {
        const store = [
            {id: 10, status: StoreStatus.active},
            {id: 11, status: StoreStatus.demo},
            {id: 12, status: StoreStatus.deleted},
            {id: 13, status: StoreStatus.suspended},
        ];
        appStore.select.and.returnValues(of({permission: {facturation: '*'}, paymentType: PaymentType.other, id: 11}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], _embedded: {store}})));
        fixture.detectChanges();
        openAccountMenu();
        expect(component.currentStore.id).toEqual(11);
        let stores = multiStoreLinks();
        expect(stores[0].getAttribute('path')).toEqual('/');
        expect(stores[0].getAttribute('ng-reflect-store-id')).toEqual('10');
        expect(stores[0].hasAttribute('disabled')).toEqual(false);
        expect(stores[1].hasAttribute('disabled')).toEqual(true);
        expect(stores[2].getAttribute('path')).toEqual('/');
        expect(stores[2].getAttribute('ng-reflect-store-id')).toEqual('13');
        expect(stores[2].hasAttribute('disabled')).toEqual(false);
        expect(stores.length).toEqual(3);
    });

    function membershipElement() {
        return document.querySelector('.account-menu [path="/facturation"]') as HTMLLinkElement;
    }

    function multiStoreLinks() {
        return document.querySelectorAll('.account-menu .store-link') as NodeListOf<HTMLLinkElement>;
    }

    function openAccountMenu() {
        fixture.debugElement.nativeElement.querySelectorAll('.sf-nav-icon')[1].click();
    }

    @Directive({
        selector: '[sfLegacyLink]'
    })
    class LegacyLinkDirective {
        @Input() path;
        @Input() storeId;
    }
});
