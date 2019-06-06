import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotagMappingComponent } from './autotag-mapping.component';

describe('AutotagMappingComponent', () => {
    let component: AutotagMappingComponent;
    let fixture: ComponentFixture<AutotagMappingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutotagMappingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutotagMappingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
