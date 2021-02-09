import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfuiOptionComponent } from './option.component';

describe('OptionComponent', () => {
    let component: SfuiOptionComponent;
    let fixture: ComponentFixture<SfuiOptionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SfuiOptionComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SfuiOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
