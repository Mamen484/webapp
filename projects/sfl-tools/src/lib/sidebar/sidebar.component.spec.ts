import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Directive, Input, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { SflAuthService, SflUserService, SflWindowRefService, SupportLinkService, TimelineService } from 'sfl-shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { SFL_LEGACY_LINK } from 'sfl-shared/entities';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TicketsDataService } from '../../../../../src/app/tickets/tickets-list/tickets-data.service';
import { ChannelLinkService } from '../../../../../src/app/core/services/channel-link.service';
import { AppState } from '../../../../../src/app/core/entities/app-state';
import { SidebarService } from './sidebar.service';
import { SftSidebarComponent } from './sidebar.component';


describe('SidebarComponent', () => {

    let component: SftSidebarComponent;
    let fixture: ComponentFixture<SftSidebarComponent>;

    let appStore: jasmine.SpyObj<Store<AppState>>;
    let userService: jasmine.SpyObj<SflUserService>;
    let windowRef: SflWindowRefService;
    let timelineService: jasmine.SpyObj<TimelineService>;
    let route: ActivatedRoute;
    let router: Router;
    let ticketsDataService: jasmine.SpyObj<TicketsDataService>;
    let channelLinkService: jasmine.SpyObj<ChannelLinkService>;
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(() => {
        appStore = jasmine.createSpyObj(['select']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        windowRef = {nativeWindow: <any>{location: {href: ''}}};
        timelineService = jasmine.createSpyObj(['emitUpdatedTimeline', 'getUpdatesNumber']);
        route = <any>{};
        router = <any>{routeReuseStrategy: {shouldDetach: jasmine.createSpy('shouldDetach'), navigate: jasmine.createSpy('navigate')}};
        ticketsDataService = jasmine.createSpyObj('TicketsDataService spy', ['requestUpdate']);
        channelLinkService = jasmine.createSpyObj('ChannelLinkService spy', ['navigateToChannel']);
        authService = jasmine.createSpyObj(['logout']);
        TestBed.configureTestingModule({
            declarations: [SftSidebarComponent, LegacyLinkDirective, StoreLink],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: SflUserService, useValue: userService},
                {provide: TimelineService, useValue: timelineService},
                {provide: SupportLinkService, useValue: 'support-link/'},
                {provide: SflAuthService, useValue: authService},
                {provide: SFL_LEGACY_LINK, useValue: ''},
                {
                    provide: SidebarService, useValue: {
                        navigateToTimeline: () => {
                        },
                        updateTicketsData: () => {
                        },
                    }
                },
                {provide: Store, useValue: appStore},
            ],
            imports: [MatMenuModule, NoopAnimationsModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        timelineService.getUpdatesNumber.and.returnValue(EMPTY);
        appStore.select.and.returnValue(of({permission: {}}));
        userService.fetchAggregatedInfo.and.returnValue(EMPTY);
        fixture = TestBed.createComponent(SftSidebarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update events number', fakeAsync(() => {
        timelineService.getUpdatesNumber.and.returnValue(of(10));
        fixture.detectChanges();
        tick();
        component.ngOnDestroy();
        expect(component.newEvents).toBe(10);
    }));

    it('should call authService.logout on logout() call', () => {
        component.logout();
        expect(authService.logout).toHaveBeenCalled();
    });

    it('should assign current store', () => {
        appStore.select.and.callFake(event => event === 'currentStore' ? of({name: 'someName', id: 22, permission: {}}) : EMPTY);
        fixture.detectChanges();
        expect(component.currentStore).toEqual(<any>{name: 'someName', id: 22, permission: {}});
    });

    it('should assign current route', () => {
        appStore.select.and.callFake(event => event === 'currentRoute' ? of({
            menuName: 'orders',
            pageName: 'orders'
        }) : of({permission: {}}));
        fixture.detectChanges();
        expect(component.currentRoute).toEqual({menuName: 'orders', pageName: 'orders'});
    });

    it('should fetch all stores', () => {
        appStore.select.and.callFake(event => event === 'currentRoute' ? of({
            menuName: 'orders',
            pageName: 'orders'
        }) : of({permission: {}}));
        userService.fetchAggregatedInfo.and.returnValue(of(<any>{
            _embedded: {
                store: [
                    {id: 1, name: 'test1'},
                    {id: 2, name: 'test2'},
                    {id: 3, name: 'test3'},
                    {id: 4, name: 'test4'},
                    {id: 5, name: 'test5'},
                    {id: 6, name: 'test6'},
                    {id: 7, name: 'test7'},
                    {id: 8, name: 'test8'},
                ]
            }
        }));
        fixture.detectChanges();
        expect(component.stores.length).toBe(8);
        expect(component.stores[7]).toEqual(<any>{id: 8, name: 'test8'});
    });

    it('should hide sidebar on hideSidebar() call', () => {
        component.contentShown = true;
        component.hideSidebar();
        expect(component.contentShown).toBe(false);
    });

    it('should show sidebar on showSidebar() call', () => {
        component.contentShown = false;
        component.showSidebar();
        expect(component.contentShown).toBe(true);
    });

    it('should enable animation if disabled on hideSidebar() call', () => {
        component.animationEnabled = false;
        component.hideSidebar();
        expect(component.animationEnabled).toBe(true);
    });

    it('should keep animation enabled on hideSidebar() call', () => {
        component.animationEnabled = true;
        component.hideSidebar();
        expect(component.animationEnabled).toBe(true);
    });


    @Directive({
        selector: '[sflLegacyLink]'
    })
    class LegacyLinkDirective {
        @Input() path;
        @Input() storeId;
    }

    @Pipe({
        name: 'storeLink'
    })
    class StoreLink implements PipeTransform {
        transform(value: any, ...args: any[]): any {
        }

    }
});
