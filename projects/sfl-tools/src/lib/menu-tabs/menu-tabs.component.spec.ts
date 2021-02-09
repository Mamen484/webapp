import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuTabsComponent } from './menu-tabs.component';
import { SflAuthService, SflLocaleIdService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { SftMenuTab } from './tool-tabs.enum';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { SFL_BASE_HREF } from 'sfl-shared/entities';

describe('MenuTabsComponent', () => {
    let component: MenuTabsComponent;
    let fixture: ComponentFixture<MenuTabsComponent>;
    let authService: jasmine.SpyObj<SflAuthService>;
    let store: jasmine.SpyObj<Store<any>>;
    let elementRef: ElementRef;

    beforeEach(waitForAsync(() => {
        authService = jasmine.createSpyObj(['logout']);
        store = jasmine.createSpyObj(['select', 'dispatch']);
        elementRef = <any>{nativeElement: {querySelector: jasmine.createSpy()}};
        TestBed.configureTestingModule({
            declarations: [MenuTabsComponent],
            providers: [
                {provide: SflAuthService, useValue: authService},
                {provide: Store, useValue: store},
                {provide: SFL_BASE_HREF, useValue: '/v3'},
                {provide: SflLocaleIdService, useValue: {localeId: 'en'}},
                {provide: ElementRef, useValue: elementRef},
            ],
            imports: [MatTabsModule],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuTabsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call authService on logout() call', () => {
        component.logout();
        expect(authService.logout).toHaveBeenCalled();
    });

    it('should throw an error if the bar input property is not specified', () => {
        expect(() => component.ngOnInit()).toThrowError('Specify the tabs bar to be displayed');
    });

    it('should NOT throw an error if the bar input property is not specified', () => {
        component.bar = 'settings';
        store.select.and.returnValue(EMPTY);
        expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should NOT throw an error if the bar input property is not specified', () => {
        component.bar = 'settings';
        store.select.and.returnValue(EMPTY);
        expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should not throw an error if there is no active tab', () => {
        component.bar = 'settings';
        expect(() => component.ngAfterViewInit()).not.toThrow();
    });

    it('should not throw an error if there is no next page button', () => {
        component.bar = 'settings';
        component.activeTab = SftMenuTab.sourceFeed;
        store.select.and.returnValue(EMPTY);
        expect(() => fixture.detectChanges()).not.toThrow();
    });


    it('should should assign a store id', () => {
        component.bar = 'settings';
        component.activeTab = SftMenuTab.sourceFeed;
        store.select.and.returnValue(of({id: 234}));
        fixture.detectChanges();
        expect(component.storeId).toBe(234);
    });
});
