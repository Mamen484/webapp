import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotagDropdownComponent } from './autotag-dropdown.component';

describe('AutotagDropdownComponent', () => {
    let component: AutotagDropdownComponent;
    let fixture: ComponentFixture<AutotagDropdownComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutotagDropdownComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutotagDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
