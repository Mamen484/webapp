import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLinkComponent } from './event-link.component';
import { LegacyLinkStubDirective } from '../../../mocks/stubs/legacy-link-stub.directive';
import { Pipe } from '@angular/core';

@Pipe({name: 'sfEventLink'})
class EventLinkPipe {}

describe('EventLinkComponent', () => {
    let component: EventLinkComponent;
    let fixture: ComponentFixture<EventLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventLinkComponent, LegacyLinkStubDirective, EventLinkPipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventLinkComponent);
        component = fixture.componentInstance;
        component.event = <any>{};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
