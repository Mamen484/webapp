import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdCardModule } from '@angular/material';
import { TimelineComponent } from './timeline.component';
import { OrderEventComponent } from './order-event/order-event.component';
import { RuleEventComponent } from './rule-event/rule-event.component';
import { ActivatedRoute } from '@angular/router';
import { events, events2 } from '../../mocks/events-mock';
import { updates } from '../../mocks/updates-mock';
import { TimelineService } from '../core/services/timeline.service';

describe('TimelineComponent', () => {
    let component: TimelineComponent;
    let fixture: ComponentFixture<TimelineComponent>;
    let getEventsSpy: jasmine.Spy;

    beforeEach(async(() => {

        getEventsSpy = jasmine.createSpy('TimelineService.getEvent()');
        getEventsSpy.and.returnValue(Observable.of(events2));

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                InfiniteScrollModule,
                FlexLayoutModule,
                MdCardModule,
            ],
            declarations: [
                TimelineComponent,
                OrderEventComponent,
                RuleEventComponent
            ],
            providers: [
                {provide: ActivatedRoute, useValue: {data: Observable.of({timeline: events, updates})}},
                {provide: TimelineService, useValue: {getEvents: getEventsSpy}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('initialization', () => {
        it('should group events by date', () => {
            expect(component.events.length).toEqual(3);
            expect(component.events[0][0]).toEqual('2016-10-19');
            expect(component.events[1][0]).toEqual('2016-10-18');
            expect(component.events[2][0]).toEqual('2016-10-17');
        });

        it('should set the order reference if event type is order lifecycle', () => {
            expect(component.events[2][1][0].type).toEqual('order.lifecycle');
            expect(component.events[2][1][0].reference).toEqual(13445);
        });

        it('should set the order reference if event type is order lifecycle', () => {
            expect(component.events[0][1][0].type).toEqual('rule.transformation');
            expect(component.events[0][1][0].ruleName).toEqual('Une règle');

            expect(component.events[0][1][4].type).toEqual('rule.segmentation');
            expect(component.events[0][1][4].ruleName).toEqual('Une règle');
        });

        it('should set updatesInProgress amount', () => {
            expect(component.updatesInProgress).toEqual(2);
        });

        it('should set a shopping_basket icon for the order type event', () => {
            expect(component.events[2][1][0].type).toEqual('order.lifecycle');
            expect(component.events[2][1][0].icon).toEqual('shopping_basket');
        });

        it('should set a build icon for the order type event', () => {
            expect(component.events[0][1][0].type).toEqual('rule.transformation');
            expect(component.events[0][1][0].icon).toEqual('build');

            expect(component.events[0][1][4].type).toEqual('rule.segmentation');
            expect(component.events[0][1][4].icon).toEqual('build');
        });
    });


    describe('scroll', () => {
        it('should load next page on scroll', () => {
            component.onScroll();
            expect(getEventsSpy).toHaveBeenCalledWith('https://app.shopping-feed.com/timeline/events?page=2');
        });

        it('should set infiniteScrollDisabled to true when all the pages are loaded', () => {
            expect(component.infiniteScrollDisabled).toEqual(false);
            component.onScroll();
            expect(component.infiniteScrollDisabled).toEqual(true);
        });
    });

});
