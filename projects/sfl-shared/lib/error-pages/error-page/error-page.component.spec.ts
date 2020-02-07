import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SflErrorPageComponent } from './error-page.component';

describe('SflErrorPageComponent', () => {
    let component: SflErrorPageComponent;
    let fixture: ComponentFixture<SflErrorPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SflErrorPageComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SflErrorPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
