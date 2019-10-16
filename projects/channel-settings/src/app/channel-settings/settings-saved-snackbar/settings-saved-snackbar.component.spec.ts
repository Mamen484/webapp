import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSavedSnackbarComponent } from './settings-saved-snackbar.component';

describe('SettingsSavedSnackbarComponent', () => {
    let component: SettingsSavedSnackbarComponent;
    let fixture: ComponentFixture<SettingsSavedSnackbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettingsSavedSnackbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsSavedSnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
