import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuContainerComponent } from './menu-container.component';
import { SflToggleSidebarService } from '../core/toggle-sidebar.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MenuContainerComponent', () => {
    let toggleSidebarService: jasmine.SpyObj<SflToggleSidebarService>;
    let route;
    let router;

    let component: MenuContainerComponent;
    let fixture: ComponentFixture<MenuContainerComponent>;

    beforeEach(() => {
        toggleSidebarService = jasmine.createSpyObj('SflToggleSidebarService', ['toggleSidebar']);
        route = {firstChild: {firstChild: {data: {showBackButton: ['orders']}}}};
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

    it('should initialize showBackButton', () => {
        fixture.detectChanges();
        router.events.next(new ActivationEnd(<any>{data: {showBackButton: ['orders']}}));
        expect(component.showBackButton).toEqual(['orders']);
    });

});
