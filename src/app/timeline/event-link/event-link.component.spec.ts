import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLinkComponent } from './event-link.component';
import { LegacyLinkStubDirective } from '../../../mocks/stubs/legacy-link-stub.directive';

describe('EventLinkComponent', () => {
    let component: EventLinkComponent;
    let fixture: ComponentFixture<EventLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventLinkComponent, LegacyLinkStubDirective]
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

    it('should return proper link for event with name=rule.segmentation', () => {
        component.event = <any>{type: 'rule.segmentation', reference: '171717'};
        expect(component.getLink()).toEqual('/tools/segmentations#171717')
    });

    it('should return proper link for event with name=rule.transformation', () => {
        component.event = <any>{type: 'rule.transformation', reference: '171717'};
        expect(component.getLink()).toEqual('/tools/rules#171717')
    });

    it('should return proper link for event with name=order.lifecycle', () => {
        component.event = <any>{type: 'order.lifecycle', reference: '171717'};
        expect(component.getLink()).toEqual('/marketplaces/orders#171717')
    })
});
