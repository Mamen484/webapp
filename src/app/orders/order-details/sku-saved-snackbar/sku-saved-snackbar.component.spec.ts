import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuSavedSnackbarComponent } from './sku-saved-snackbar.component';

describe('SkuSavedSnackbarComponent', () => {
    let component: SkuSavedSnackbarComponent;
    let fixture: ComponentFixture<SkuSavedSnackbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SkuSavedSnackbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SkuSavedSnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
