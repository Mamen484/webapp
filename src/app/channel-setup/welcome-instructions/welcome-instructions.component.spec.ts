import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeInstructionsComponent } from './welcome-instructions.component';

describe('WelcomeInstructionsComponent', () => {
    let component: WelcomeInstructionsComponent;
    let fixture: ComponentFixture<WelcomeInstructionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WelcomeInstructionsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeInstructionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
