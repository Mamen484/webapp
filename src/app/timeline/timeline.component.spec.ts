import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatCardModule, MatChipsModule, MatIconModule, MatListModule, MatProgressSpinnerModule
} from '@angular/material';
import { TimelineComponent } from './timeline.component';
import { events, events2 } from '../../mocks/events-mock';
import { updates } from '../../mocks/updates-mock';
import { StreamEventType, TimelineService } from '../core/services/timeline.service';
import { EventLinkComponent } from './event-link/event-link.component';
import { UpdateRowComponent } from './update-row/update-row.component';
import { Store } from '@ngrx/store';
import { aggregatedUserInfoMock } from '../../mocks/agregated-user-info-mock';
import { eventsWithErrors } from '../../mocks/events-with-errors.mock';
import { LegacyLinkDirective } from '../shared/legacy-link.directive';
import { LegacyLinkService } from '../core/services/legacy-link.service';
import { Component, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { environment } from '../../environments/environment';
import { TimelineUpdateName } from '../core/entities/timeline-update-name.enum';
import { dataDistinct } from '../../mocks/updates-for-timeline-service.mock';
import { EventIconPipe } from './event-icon/event-icon.pipe';
import { EventLinkPipe } from './event-link/event-link.pipe';

@Pipe({
    name: 'sfEventIcon'
})
export class EventIconPipeShallow implements PipeTransform {
    transform() {
        return null
    };
}

@Pipe({
    name: 'sfEventLink'
})
export class EventLinkPipeShallow implements PipeTransform {
    transform() {
        return null
    };
}


describe('TimelineComponent', () => {
    let component: TimelineComponent;
    let fixture: ComponentFixture<TimelineComponent>;
    let timelineService: jasmine.SpyObj<TimelineService>;

    describe('shallow tests', () => {
        beforeEach(async(() => {

            timelineService = jasmine.createSpyObj('TimelineService', ['getEvents', 'getEventsByLink', 'getTimelineStream', 'emitUpdatedTimeline'])
            timelineService.getEventsByLink.and.returnValue(of(events2));
            timelineService.getTimelineStream.and.returnValue(of({
                type: StreamEventType.finished,
                data: {events, updates}
            }));

            TestBed.configureTestingModule({
                declarations: [
                    TimelineComponent,
                    EventIconPipeShallow,
                    EventLinkPipeShallow,
                ],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    {
                        provide: TimelineService,
                        useValue: timelineService
                    },
                    {
                        provide: Store,
                        useValue: {select: param => of(aggregatedUserInfoMock._embedded.store[0])}
                    }
                ]
            })
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TimelineComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        describe('initialization', () => {

            it('should group events by date', () => {
                expect(component.events.length).toEqual(2);
                expect(component.events[0][0]).toEqual('2017-10-03');
                expect(component.events[1][0]).toEqual('2017-10-02');
            });

            it('should set updatesInProgress amount', () => {
                expect(component.updatesInProgress).toEqual(1);
            });

        });


        describe('scroll', () => {
            it('should load next page on scroll', () => {
                component.onScroll();
                expect(timelineService.getEventsByLink).toHaveBeenCalledWith('/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle&page=2&limit=10');
            });

            it('should set infiniteScrollDisabled to true when all the pages are loaded', () => {
                expect(component.infiniteScrollDisabled).toEqual(false);
                component.onScroll();
                expect(component.infiniteScrollDisabled).toEqual(true);
            });

            it('if the date of the last event on page 1 equals to the date of first event on page 2, should merge events for this same date to one group', () => {
                component.onScroll();
                expect(component.events[1][0]).toEqual('2017-10-02');
                expect(component.events[1][1].length).toEqual(8);

                expect(component.events.length).toEqual(3);

                expect(component.events[2][0]).toEqual('2017-10-01');
                expect(component.events[2][1].length).toEqual(6);
            });
        });

        it ('should return a `/tools/info` link when calling getUpdateLink(), passing update with name that equals feed.import', () => {
            let link = component.getUpdateLink(<any>{name: TimelineUpdateName.import});
            expect(link).toEqual('/tools/infos');
        });

        it ('should return a link to the channel when the type of channel is marketplace and the name is feed.export', () => {
            let link = component.getUpdateLink(<any>{name: TimelineUpdateName.export, _embedded: {channel: {type: 'marketplace', name: 'amazon'}}});
            expect(link).toEqual('/amazon');
        });

        it ('should return a link to the channel when the type of channel is NOT marketplace and the name is feed.export', () => {
            let link = component.getUpdateLink(<any>{name: TimelineUpdateName.export, _embedded: {channel: {type: 'ads', name: 'amazon'}}});
            expect(link).toEqual('/ads/manage/amazon');
        });


    });

    @Component({selector: 'sf-timeline-filtering-area', template: ''})
    class TimelineFilteringAreaComponent {}
    describe('integration tests', () => {
        let localStorage;

        beforeEach(async(() => {

            timelineService = jasmine.createSpyObj('TimelinService', ['getEvents', 'getEventsByLink', 'getTimelineStream', 'emitUpdatedTimeline']);
            localStorage = jasmine.createSpyObj('LocalStorage', ['getItem']);
            localStorage.getItem.and.returnValue('someToken');

            TestBed.configureTestingModule({
                imports: [
                    CommonModule,
                    InfiniteScrollModule,
                    FlexLayoutModule,
                    MatCardModule,
                    MatChipsModule,
                    MatListModule,
                    MatIconModule,
                    MatProgressSpinnerModule,
                ],
                declarations: [
                    TimelineComponent,
                    EventLinkComponent,
                    LegacyLinkDirective,
                    UpdateRowComponent,
                    TimelineFilteringAreaComponent,
                    EventIconPipe,
                    EventLinkPipe,
                ],
                providers: [
                    {
                        provide: TimelineService,
                        useValue: timelineService
                    },
                    {
                        provide: Store,
                        useValue: {select: param => of(aggregatedUserInfoMock._embedded.store[0])}
                    },
                    LegacyLinkService,
                    {provide: Store, useValue: {select: () => of({id: 'storeId'})}},
                    {provide: LocalStorageService, useValue: localStorage}

                ]
            })
                .compileComponents();
        }));

        beforeEach(() => {
            timelineService.getTimelineStream.and.returnValue(of({
                type: StreamEventType.finished,
                data: {events: eventsWithErrors, updates: dataDistinct}
            }));
            fixture = TestBed.createComponent(TimelineComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should convert API data to the correct list of udpates', () => {
            fixture.whenStable().then(() => {
                let items = fixture.debugElement.nativeElement.querySelectorAll('sf-update-row');
                expect(items.length).toEqual(4);
                validateUpdate(items[0], 'vertical_align_top', 'Amazon', 'Completed');
                validateUpdate(items[1], 'vertical_align_top', 'CDiscount', 'Completed');
                validateUpdate(items[2], 'vertical_align_bottom', 'Source feed', 'Completed');
                validateUpdate(items[3], 'vertical_align_top', 'Fnac', 'Error');
            });
        });

        it('should convert API data to the correct list of events', () => {
            fixture.whenStable().then(() => {
                let items = fixture.debugElement.nativeElement.querySelectorAll('.event mat-list-item');
                expect(items.length).toEqual(17);
                validateEvent(items[0], 'build', 'The rule "some name" has been created.', '/tools/rules#sd3wwfd');
                validateEvent(items[1], 'shopping_basket', 'The order 59d53a6b2b26b can\'t be imported to your store.', '/marketplaces/orders/59d53a6b2b26b');
                validateEvent(items[2], 'build', 'The Auto-Remove rule "some name" has been deleted.', '/tools/segmentations#353433dfd');
                // feed.import - no reason
                validateEvent(items[3], 'error_outline', 'Your source feed can\'t be updated because of an unrecognized error.', '/tools/infos');
                // feed.import - reason: categories
                validateEvent(items[4], 'error_outline', 'We can\'t update your source feed because too many categories changes.', '/tools/infos');
                // feed.import - reason: products
                validateEvent(items[5], 'error_outline', 'We can\'t update your source feed because too many products changed.', '/tools/infos');
                // feed.import - reason: open
                validateEvent(items[6], 'error_outline', 'We can\'t update your source feed because we can\'t open it.', '/tools/infos');
                // feed.export - channel: amazon
                validateEvent(items[7], 'error_outline', 'We can\'t export your feed to amazon.', '/amazon');
                // feed.export - channel: some_ad
                validateEvent(items[8], 'error_outline', 'We can\'t export your feed to some_ad.', '/ads/manage/some_ad');
                // feed.import - reason: check
                validateEvent(items[9], 'error_outline', 'Your source feed wasn\'t updated because nothing had changed since the last update.', '/tools/infos');
                // feed.import - reason: references
                validateEvent(items[10], 'error_outline', 'We can\'t update your source feed because too many products changed.', '/tools/infos');
                // feed.import - reason: mapping
                validateEvent(items[11], 'error_outline', 'We can\'t update your source feed because columns changed.', '/tools/infos');
                // feed.import - reason: abracadabra
                validateEvent(items[12], 'error_outline', 'Your source feed can\'t be updated because of an unrecognized error.', '/tools/infos');
                // feed.import - reason: settings
                validateEvent(items[13], 'error_outline', 'We can\'t update your source feed because columns changed.', '/tools/infos');
                // feed.export - action: cancel
                validateEvent(items[14], 'error_outline', 'We canceled your export on amazon because another export is already in progress.')
                validateEvent(items[15], 'vertical_align_bottom', 'Your feed has been imported.', '/tools/infos');
                validateEvent(items[16], 'vertical_align_top', 'Your feed has been exported to javascript_marketplace.', '/javascript_marketplace');
            });
        });
    })

});

function validateEvent(elem, iconName, text, url?) {
    expect(elem.querySelector('.event-icon > mat-icon').textContent.trim()).toEqual(iconName);
    expect(elem.querySelector('sf-event-link').textContent.trim().replace(/\s\s+/g, ' '))
        .toEqual(text);
    if (url) {
        expect(elem.querySelector('sf-event-link > a').href)
            .toEqual(environment.APP_URL + url + '?token=someToken&store=storeId');
    }
}

function validateUpdate(elem, iconName, channel, status) {
    expect(elem.querySelector('.event-icon > mat-icon').textContent).toEqual(iconName);
    expect(elem.querySelector('.channel-name').textContent.trim()).toEqual(channel);
    expect(elem.querySelector('.event-description').textContent.trim()).toEqual(status);
}
