import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfuiToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
    let component: SfuiToggleComponent;
    let fixture: ComponentFixture<SfuiToggleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SfuiToggleComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SfuiToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
