import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfuiSelectComponent } from './select.component';

describe('SelectComponent', () => {
    let component: SfuiSelectComponent;
    let fixture: ComponentFixture<SfuiSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SfuiSelectComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SfuiSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
