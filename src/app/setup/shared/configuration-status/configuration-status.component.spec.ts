import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationStatusComponent } from './configuration-status.component';

describe('ConfigurationStatusComponent', () => {
    let component: ConfigurationStatusComponent;
    let fixture: ComponentFixture<ConfigurationStatusComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfigurationStatusComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfigurationStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
