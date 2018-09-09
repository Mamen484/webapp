import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStatsRowComponent } from './event-stats-row.component';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';
import { Pipe, PipeTransform } from '@angular/core';

describe('EventStatsRowComponent', () => {
    let component: EventStatsRowComponent;
    let fixture: ComponentFixture<EventStatsRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventStatsRowComponent, MockDatePipe],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventStatsRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a proper content for completed import event', () => {
        component.action = TimelineEventAction.finish;
        component.date = '2017-11-22T12:06:47+00:00';
        jasmine.clock().withMock(() => {
            fixture.detectChanges();
        });
        expect(fixture.debugElement.nativeElement.textContent).toBe('Completed some_date');
    });

    it('should render a proper content for completed export event', () => {
        component.action = TimelineEventAction.finish;
        component.channelName = 'Amazon';
        component.date = '2017-11-22T12:06:47+00:00';
        jasmine.clock().withMock(() => {
            fixture.detectChanges();
        });
        expect(fixture.debugElement.nativeElement.textContent).toBe('Amazon Completed some_date');
    });

    it('should render a proper content for import event', () => {
        component.action = TimelineEventAction.error;
        component.date = '2017-11-22T12:06:47+00:00';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('Error some_date');
    });

    it('should render a proper content for failed export event', () => {
        component.action = TimelineEventAction.error;
        component.date = '2017-11-22T12:06:47+00:00';
        component.channelName = 'Amazon';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('Amazon Error some_date');
    });

    @Pipe({
        name: 'date',
    })
    class MockDatePipe implements PipeTransform {
        transform() {
            return 'some_date';
        }
    }
});
