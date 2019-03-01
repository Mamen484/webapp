import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatSidenavModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SflSidebarContainerComponent } from './sidebar-container.component';
import { Subject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SflToggleSidebarService } from './toggle-sidebar.service';
import { MediaObserver } from '@angular/flex-layout';

describe('SflSidebarContainerComponent', () => {

    let fixture: ComponentFixture<SflSidebarContainerComponent>;
    let component: SflSidebarContainerComponent;
    let media$: Subject<any>;
    beforeEach(() => {
        media$ = new Subject();
        TestBed.configureTestingModule({
            imports: [MatMenuModule, MatSidenavModule, NoopAnimationsModule],
            declarations: [SflSidebarContainerComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MediaObserver, useValue: {media$}},
            ],
        });

        fixture = TestBed.createComponent(SflSidebarContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should handle mobile mode and close/open sidebar according to the screen size', () => {
        media$.next({mqAlias: 'xs'});
        expect(component.isMobile).toBe(true);
        expect(component.opened).toBe(false);

        media$.next({mqAlias: 'sm'});
        expect(component.isMobile).toBe(false);
        expect(component.opened).toBe(true);

        media$.next({mqAlias: 'md'});
        expect(component.isMobile).toBe(false);
        expect(component.opened).toBe(true);

        media$.next({mqAlias: 'lg'});
        expect(component.isMobile).toBe(false);
        expect(component.opened).toBe(true);

        media$.next({mqAlias: 'xl'});
        expect(component.isMobile).toBe(false);
        expect(component.opened).toBe(true);
    });

    it('should toggle sidebar when toggleSidebar event comes', () => {
        const service: SflToggleSidebarService = TestBed.get(SflToggleSidebarService);
        component.sidenav = <any>{toggle: jasmine.createSpy()};
        service.toggleSidebar();
        expect(component.sidenav.toggle).toHaveBeenCalled();
    });
});
