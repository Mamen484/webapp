import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfuiExpandableComponent } from './expandable.component';

describe('ExpandableComponent', () => {
    let component: SfuiExpandableComponent;
    let fixture: ComponentFixture<SfuiExpandableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SfuiExpandableComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SfuiExpandableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
