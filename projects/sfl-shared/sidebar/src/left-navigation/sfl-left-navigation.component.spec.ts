import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SflLeftNavigationComponent } from './sfl-left-navigation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LeftNavigationComponent', () => {
    let component: SflLeftNavigationComponent;
    let fixture: ComponentFixture<SflLeftNavigationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SflLeftNavigationComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SflLeftNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
