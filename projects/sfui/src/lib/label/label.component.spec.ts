import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfuiLabelComponent } from './label.component';

describe('LabelComponent', () => {
    let component: SfuiLabelComponent;
    let fixture: ComponentFixture<SfuiLabelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SfuiLabelComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SfuiLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
