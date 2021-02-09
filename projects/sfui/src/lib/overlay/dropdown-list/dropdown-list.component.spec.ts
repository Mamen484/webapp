import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfuiDropdownListComponent } from './dropdown-list.component';

describe('DropdownListComponent', () => {
    let component: SfuiDropdownListComponent;
    let fixture: ComponentFixture<SfuiDropdownListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SfuiDropdownListComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SfuiDropdownListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
