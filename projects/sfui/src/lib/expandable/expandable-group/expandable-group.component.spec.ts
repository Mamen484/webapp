import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfuiExpandableGroupComponent } from './expandable-group.component';

describe('ExpandableGroupComponent', () => {
    let component: SfuiExpandableGroupComponent;
    let fixture: ComponentFixture<SfuiExpandableGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SfuiExpandableGroupComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SfuiExpandableGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
