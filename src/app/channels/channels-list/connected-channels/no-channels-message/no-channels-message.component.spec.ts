import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoChannelsMessageComponent } from './no-channels-message.component';

describe('NoChannelsMessageComponent', () => {
    let component: NoChannelsMessageComponent;
    let fixture: ComponentFixture<NoChannelsMessageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NoChannelsMessageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NoChannelsMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
