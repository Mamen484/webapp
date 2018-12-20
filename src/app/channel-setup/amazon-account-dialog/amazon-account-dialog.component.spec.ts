import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonAccountDialogComponent } from './amazon-account-dialog.component';

describe('AmazonAccountDialogComponent', () => {
    let component: AmazonAccountDialogComponent;
    let fixture: ComponentFixture<AmazonAccountDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AmazonAccountDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AmazonAccountDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
