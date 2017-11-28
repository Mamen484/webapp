import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
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
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import {environment} from "../../environments/environment";

describe('TimelineComponent', () => {
    let component: TimelineComponent;
    let fixture: ComponentFixture<TimelineComponent>;
    let timelineService: jasmine.SpyObj<TimelineService>;

    describe('shallow tests', () => {
        beforeEach(async(() => {

            timelineService = jasmine.createSpyObj('TimelinService', ['getEvents', 'getTimelineStream', 'emitUpdatedTimeline'])
            timelineService.getEvents.and.returnValue(Observable.of(events2));
            timelineService.getTimelineStream.and.returnValue(Observable.of({
                type: StreamEventType.finished,
                data: {events, updates}
            }));

            TestBed.configureTestingModule({
                declarations: [
                    TimelineComponent,
                ],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    {
                        provide: TimelineService,
                        useValue: timelineService
                    },
                    {
                        provide: Store,
                        useValue: {select: param => Observable.of(aggregatedUserInfoMock._embedded.store[0])}
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

            it('should set the order reference if event type is order lifecycle', () => {
                expect(component.events[0][1][2].type).toEqual('order.lifecycle');
                expect(component.events[0][1][2].reference).toEqual('59d53a6b2b26b');
            });

            it('should set the order reference if event type is rule.*', () => {
                expect(component.events[0][1][0].type).toEqual('rule.transformation');
                expect(component.events[0][1][0].ruleName).toEqual('some name');

                expect(component.events[0][1][3].type).toEqual('rule.segmentation');
                expect(component.events[0][1][3].ruleName).toEqual('some name');
            });

            it('should set updatesInProgress amount', () => {
                expect(component.updatesInProgress).toEqual(1);
            });

            it('should set a shopping_basket icon for the order type event', () => {
                expect(component.events[0][1][2].type).toEqual('order.lifecycle');
                expect(component.events[0][1][2].icon).toEqual('shopping_basket');
            });

            it('should set a build icon for the order type event', () => {
                expect(component.events[0][1][0].type).toEqual('rule.transformation');
                expect(component.events[0][1][0].icon).toEqual('build');

                expect(component.events[0][1][3].type).toEqual('rule.segmentation');
                expect(component.events[0][1][3].icon).toEqual('build');
            });
        });


        describe('scroll', () => {
            it('should load next page on scroll', () => {
                component.onScroll();
                expect(timelineService.getEvents).toHaveBeenCalledWith(null, '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle&page=2&limit=10');
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


    });

    describe('integration tests', () => {
        let localStorage;

        beforeEach(async(() => {

            timelineService = jasmine.createSpyObj('TimelinService', ['getEvents', 'getTimelineStream', 'emitUpdatedTimeline']);
            localStorage = jasmine.createSpyObj('LocalStorage', ['getItem']);
            localStorage.getItem.and.returnValue('someToken');

            TestBed.configureTestingModule({
                imports: [
                    CommonModule,
                    InfiniteScrollModule,
                    FlexLayoutModule,
                    MatCardModule,
                    MatChipsModule,
                ],
                declarations: [
                    TimelineComponent,
                    EventLinkComponent,
                    LegacyLinkDirective,
                    UpdateRowComponent,
                ],
                providers: [
                    {
                        provide: TimelineService,
                        useValue: timelineService
                    },
                    {
                        provide: Store,
                        useValue: {select: param => Observable.of(aggregatedUserInfoMock._embedded.store[0])}
                    },
                    LegacyLinkService,
                    {provide: Store, useValue: {select: () => Observable.of({name: 'storeName'})}},
                    {provide: LocalStorageService, useValue: localStorage}

                ]
            })
                .compileComponents();
        }));

        beforeEach(() => {
            timelineService.getTimelineStream.and.returnValue(Observable.of({
                type: StreamEventType.finished,
                data: {events: eventsWithErrors, updates}
            }));
            fixture = TestBed.createComponent(TimelineComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        it('should convert API data to the correct list of events', () => {
            fixture.whenStable().then(() => {
                let items = fixture.debugElement.nativeElement.querySelectorAll('.event mat-list-item');
                expect(items.length).toEqual(13);
                validateEvent(items[0], 'build', 'The rule "some name" has been created.', '/tools/rules#sd3wwfd');
                validateEvent(items[1], 'shopping_basket', 'The order 59d53a6b2b26b can\'t be imported to your store.', '/marketplaces/orders/59d53a6b2b26b');
                validateEvent(items[2], 'build', 'The Auto-Remove rule "some name" has been deleted.', '/tools/segmentations#353433dfd');
                validateEvent(items[3], 'error_outline', 'Your source feed can\'t be updated because of an unrecognized error.', '/tools/infos');
                validateEvent(items[4], 'error_outline', 'We can\'t update your source feed because too many categories changes.', '/tools/infos');
                validateEvent(items[5], 'error_outline', 'We can\'t update your source feed because too many products changed.', '/tools/infos');
                validateEvent(items[6], 'error_outline', 'We can\'t update your source feed because we can\'t open it.', '/tools/infos');
                validateEvent(items[7], 'error_outline', 'We can\'t export your feed to amazon.', '/amazon');
                validateEvent(items[8], 'error_outline', 'We can\'t export your feed to some_ad.', '/ads/manage/some_ad');
                validateEvent(items[9], 'error_outline', 'Your source feed wasn\'t updated because nothing had changed since the last update.', '/tools/infos');
                validateEvent(items[10], 'error_outline', 'We can\'t update your source feed because columns changed.', '/tools/infos');
                validateEvent(items[11], 'error_outline', 'We can\'t update your source feed because columns changed.', '/tools/infos');
                validateEvent(items[12], 'error_outline', 'Your source feed can\'t be updated because of an unrecognized error.', '/tools/infos');

            });
        });
    })

});

function validateEvent(elem, iconName, text, url?) {
    expect(elem.querySelector('.event-icon > mat-icon').textContent).toEqual(iconName);
    expect(elem.querySelector('sf-event-link').textContent.trim().replace(/\s\s+/g, ' '))
        .toEqual(text);
    if (url) {
        expect(elem.querySelector('sf-event-link > a').href)
            .toEqual(environment.APP_URL + url + '?token=someToken&store=storeName');
    }
}

