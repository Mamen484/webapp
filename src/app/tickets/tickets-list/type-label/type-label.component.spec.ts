import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeLabelComponent } from './type-label.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TypeLabelComponent', () => {
    let component: TypeLabelComponent;
    let fixture: ComponentFixture<TypeLabelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TypeLabelComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
