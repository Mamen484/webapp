import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuContainerComponent } from './menu-container.component';
import { SflToggleSidebarService } from 'sfl-shared/sidebar';
import { Subject } from 'rxjs';
import { ActivatedRoute, ActivationEnd, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MenuContainerComponent', () => {
    let toggleSidebarService: jasmine.SpyObj<SflToggleSidebarService>;
    let route;
    let router;

    let component: MenuContainerComponent;
    let fixture: ComponentFixture<MenuContainerComponent>;

    beforeEach(() => {
        toggleSidebarService = jasmine.createSpyObj('SflToggleSidebarService', ['toggleSidebar']);
        route = {firstChild: {firstChild: {data: {}}}};
        router = {events: new Subject(), navigate: jasmine.createSpy('navigate')};
        TestBed.configureTestingModule({
            declarations: [MenuContainerComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: SflToggleSidebarService, useValue: toggleSidebarService},
                {provide: ActivatedRoute, useValue: route},
                {provide: Router, useValue: router},
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuContainerComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not assign showBackButton if it is ot in a route data', () => {
        fixture.detectChanges();
        router.events.next(new ActivationEnd(<any>{data: {}}));
        expect(component.showBackButton).not.toBeDefined();
    });

    it('should initialize showBackButton', () => {
        fixture.detectChanges();
        router.events.next(new ActivationEnd(<any>{data: {showBackButton: ['orders']}}));
        expect(component.showBackButton).toEqual(['orders']);
    });

    it('should reset showBackButton when new navigation emitted', () => {
        fixture.detectChanges();
        component.showBackButton = [];
        router.events.next(new NavigationStart(0, ''));
        expect(component.showBackButton).not.toBeDefined();
    });

    it('should call toggle sidebar on toggleSidebar() call', () => {
        component.toggleSidebar();
        expect(toggleSidebarService.toggleSidebar).toHaveBeenCalled();
    });

    it('should navigate to the back route when call followBackButton()', () => {
        component.showBackButton = ['orders'];
        component.followBackButton();
        expect(router.navigate).toHaveBeenCalledWith(['orders']);
    });

    it('should display a progress bar when the route is being changed', () => {
        component.checkRouterEvent(new NavigationStart(0, ''));
        expect(component.loadingNextRoute).toBe(true);
        component.checkRouterEvent(new NavigationEnd(0, '', ''));
        expect(component.loadingNextRoute).toBe(false);
        component.checkRouterEvent(new NavigationCancel(0, '', ''));
        expect(component.loadingNextRoute).toBe(false);
        component.checkRouterEvent(new NavigationError(0, '', ''));
        expect(component.loadingNextRoute).toBe(false);
    });

});
