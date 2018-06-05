import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormComponent } from './address-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('AddressFormComponent', () => {
    let component: AddressFormComponent;
    let fixture: ComponentFixture<AddressFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddressFormComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [FormsModule]
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
