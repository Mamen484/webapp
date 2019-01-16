import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnavComponent } from './subnav.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubnavComponent', () => {
    let component: SubnavComponent;
    let fixture: ComponentFixture<SubnavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubnavComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubnavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
