import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelOnlineComponent } from './channel-online.component';

describe('ChannelOnlineComponent', () => {
    let component: ChannelOnlineComponent;
    let fixture: ComponentFixture<ChannelOnlineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChannelOnlineComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelOnlineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
