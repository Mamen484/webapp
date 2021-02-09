import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfuiFormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
    let component: SfuiFormFieldComponent;
    let fixture: ComponentFixture<SfuiFormFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SfuiFormFieldComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SfuiFormFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
