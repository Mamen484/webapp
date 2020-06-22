import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CreateAccountComponent } from './create-account.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateAccount', () => {
    let component: CreateAccountComponent;
    let fixture: ComponentFixture<CreateAccountComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreateAccountComponent,
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ],
            providers: []

        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateAccountComponent);
        component = fixture.componentInstance;
        component.updateFrequency = 0;
    });

    it('should set progress to 100 and activate a button by setting registrationFinished to true', fakeAsync(() => {
        let button = fixture.debugElement.nativeElement.querySelector('a');
        fixture.detectChanges();
        expect(component.progress).toEqual(0);
        expect(component.registrationFinished).toEqual(false);
        expect(button.disabled).toEqual(true);
        tick();
        fixture.detectChanges();
        expect(component.progress).toEqual(100);
        expect(component.registrationFinished).toEqual(true);
        expect(button.disabled).toEqual(false);
    }));
});
