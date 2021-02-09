import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SflSidebarContainerComponent } from './sidebar-container.component';
import { Subject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SflToggleSidebarService } from './toggle-sidebar.service';

describe('SflSidebarContainerComponent', () => {

    let fixture: ComponentFixture<SflSidebarContainerComponent>;
    let component: SflSidebarContainerComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatMenuModule, MatSidenavModule, NoopAnimationsModule],
            declarations: [SflSidebarContainerComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
            ],
        });

        fixture = TestBed.createComponent(SflSidebarContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle sidebar when toggleSidebar event comes', () => {
        const service: SflToggleSidebarService = TestBed.get(SflToggleSidebarService);
        component.sidenav = <any>{toggle: jasmine.createSpy()};
        service.toggleSidebar();
        expect(component.sidenav.toggle).toHaveBeenCalled();
    });

    it('should set windowHeight on resize', () => {
        component.windowHeight = undefined;
        component.onResize({});
        expect(component.windowHeight).toBeTruthy();
    });
});
