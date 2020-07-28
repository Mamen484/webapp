import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotagsRequiredSnackbarComponent } from './autotags-required-snackbar.component';

describe('AutotagsRequiredSnackbarComponent', () => {
    let component: AutotagsRequiredSnackbarComponent;
    let fixture: ComponentFixture<AutotagsRequiredSnackbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutotagsRequiredSnackbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutotagsRequiredSnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
