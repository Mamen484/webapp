import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoChannelsFoundMessageComponent } from './no-channels-found-message.component';

describe('NoChannelsFoundMessageComponent', () => {
    let component: NoChannelsFoundMessageComponent;
    let fixture: ComponentFixture<NoChannelsFoundMessageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NoChannelsFoundMessageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NoChannelsFoundMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
