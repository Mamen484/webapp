import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormComponent } from './address-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddressFormComponent', () => {
    let component: AddressFormComponent;
    let fixture: ComponentFixture<AddressFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddressFormComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressFormComponent);
        component = fixture.componentInstance;
        component.address = <any>{};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
