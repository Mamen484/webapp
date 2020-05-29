import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTermsSnackbarComponent } from './accept-terms-snackbar.component';

describe('AcceptTermsSnackbarComponent', () => {
    let component: AcceptTermsSnackbarComponent;
    let fixture: ComponentFixture<AcceptTermsSnackbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AcceptTermsSnackbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcceptTermsSnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
