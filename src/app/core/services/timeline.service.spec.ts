import { StreamEventType, TimelineService } from './timeline.service';
import { Timeline } from '../entities/timeline';
import { data, data2 } from '../../../mocks/updates-for-timeline-service.mock';
import { environment } from '../../../environments/environment';
import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimelineFilter } from '../entities/timeline-filter';
import { TimelineEventName } from '../entities/timeline-event-name.enum';
import { TimelineEventAction } from '../entities/timeline-event-action.enum';
import { TimelineEvent } from '../entities/timeline-event';
import { take, toArray } from 'rxjs/operators';
import { allowNoExpectations } from '../entities/allow-no-expectaions';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { of } from 'rxjs';

describe('TimelineService', () => {

    let service;
    let httpClient: jasmine.SpyObj<HttpClient>;
    let httpMock: HttpTestingController;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select']);
        TestBed.configureTestingModule({
            providers: [
                TimelineService,
                {provide: Store, useValue: appStore},
            ],
            imports: [HttpClientTestingModule]
        });

        service = TestBed.get(TimelineService);
        httpClient = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
        appStore.select.and.returnValue(of({id: 909}));

        let baseTime = new Date(Date.UTC(2017, 5, 14, 2, 22, 41));
        jasmine.clock().mockDate(baseTime);
    }));

    it('should create an array of distinct updates: only the one last import and one last export of each channel', () => {


        service.getEventUpdates().subscribe((updates: Timeline<TimelineEvent>) => {
            let upd = updates._embedded.timeline;
            // feed.import
            expect(upd[0].id).toEqual('59e0dcb1ae7b3b02694c3ff1');

            // feed.export - SmartFeed
            expect(upd[1].id).toEqual('59e0dcb2ae7b3b02694c3ff3');

            // feed export - Amazon
            expect(upd[2].id).toEqual('59e0dc80ae7b3b02656ab2c3');
            expect(upd.length).toEqual(3);
        });

        let req = httpMock.expectOne(`${environment.API_URL}/store/909/timeline?name=feed.export,feed.import` +
            `&since=2017-06-13T02:22:41.000Z&limit=200&action=ask,start,finish,error,cancel`);

        req.flush(data);

        httpMock.verify();

    });

    it('should create an array of distinct updates: only the one last import and one last export of each channel', () => {
        service.getEventUpdates().subscribe((updates: Timeline<TimelineEvent>) => {
            let upd = updates._embedded.timeline;
            // feed.export - Amazon
            expect(upd[0].id).toEqual('5a8be8cf14f698306a067839');
            // feed.export - CDiscount
            expect(upd[1].id).toEqual('5a8be8c114f698306a067837');
            // feed.import
            expect(upd[2].id).toEqual('5a8be8bb6ec8c32ec02cf4b9');
            // feed.export - Fnac
            expect(upd[3].id).toEqual('5a8be75214f698306a06780a');

            expect(upd.length).toEqual(4);
        });

        let req = httpMock.expectOne(`${environment.API_URL}/store/909/timeline?name=feed.export,feed.import&` +
            `since=2017-06-13T02:22:41.000Z&limit=200&action=ask,start,finish,error,cancel`);

        req.flush(data2);

        httpMock.verify();
    });

    it('should pass proper params on getEvents call', () => {
        service.getEvents().subscribe();

        httpMock.expectOne(`${environment.API_URL}/store/909/timeline?limit=50&name=feed.import,feed.export,order.lifecycle,` +
            `rule.transformation,rule.segmentation&action=create,push,delete,ship,update,error,cancel`);
        allowNoExpectations();
        httpMock.verify();
    });

    it('should fetch appropriate link on getEventsByLink call', () => {
        service.getEventsByLink('/v1/store/909/timeline?name=feed.import&feed.export&order.lifecycle&rule.transformation&' +
            'rule.segmentation&action=create&push&delete&ship&update&error&page=2&limit=10').subscribe();
        httpMock.expectOne(`${environment.API_URL_WITHOUT_VERSION}/v1/store/909/timeline?name=feed.import&feed.export&order.lifecycle&` +
            `rule.transformation&rule.segmentation&action=create&push&delete&ship&update&error&page=2&limit=10`);
        allowNoExpectations();
        httpMock.verify();
    });

    it('should pass proper params on getEventUpdates call', () => {
        service.getEventUpdates().subscribe();

        httpMock.expectOne(`${environment.API_URL}/store/909/timeline?name=feed.export,feed.import&since=2017-06-13T02:22:41.000Z&` +
            `limit=200&action=ask,start,finish,error,cancel`);
        allowNoExpectations();
        httpMock.verify();
    });

    it('should use TimelineFilter to set params of getEvents request', () => {
        let filter = new TimelineFilter();
        filter.name = [TimelineEventName.ruleSegmentation, TimelineEventName.orderLifecycle];
        filter.action = [TimelineEventAction.delete, TimelineEventAction.ship];
        filter.since = new Date();
        filter.until = new Date(new Date().getTime() + 2000);

        service.getEvents(filter).subscribe();
        httpMock.expectOne(`${environment.API_URL}/store/909/timeline?limit=50&name=rule.segmentation,order.lifecycle&action=delete,ship&` +
            `since=2017-06-14T02:22:41.000Z&until=2017-06-14T02:22:43.000Z`);
        allowNoExpectations();
    });

    it('should create an array of distinct updates: only the one last import and one last export of each channel', () => {
        jasmine.clock().mockDate(new Date(Date.UTC(2011, 11, 11)));
        service.getEventUpdates().subscribe((updates: Timeline<TimelineEvent>) => {
            let upd = updates._embedded.timeline;
            // feed.import
            expect(upd[0].id).toEqual('59e0dcb1ae7b3b02694c3ff1');

            // feed.export - SmartFeed
            expect(upd[1].id).toEqual('59e0dcb2ae7b3b02694c3ff3');

            // feed export - Amazon
            expect(upd[2].id).toEqual('59e0dc80ae7b3b02656ab2c3');
            expect(upd.length).toEqual(3);
        });
        let req = httpMock.expectOne(`${environment.API_URL}/store/909/timeline?name=feed.export,feed.import&` +
            `since=2011-12-10T00:00:00.000Z&limit=200&action=ask,start,finish,error,cancel`);
        req.flush(data);
        httpMock.verify();

    });


    it('should fetch both events and updates when timeline update emitted', () => {
        jasmine.clock().mockDate(new Date(Date.UTC(2011, 11, 11)));
        service.emitUpdatedTimeline();
        httpMock.expectOne(`${environment.API_URL}/store/909/timeline?name=feed.export,feed.import&` +
            `since=2011-12-10T00:00:00.000Z&limit=200&action=ask,start,finish,error,cancel`);
        httpMock.expectOne(`${environment.API_URL}/store/909/timeline?limit=50&name=feed.import,feed.export,order.lifecycle,` +
            `rule.transformation,rule.segmentation&action=create,push,delete,ship,update,error,cancel`);
        allowNoExpectations();
        httpMock.verify();

    });

    it('should pass to subscribers two events: fetch start (empty) and fetch finish (with data) when updated timeline is requested', (done) => {

        service.getTimelineStream().pipe(take(2), toArray()).subscribe(streamEvents => {
            expect(streamEvents.length).toEqual(2);
            expect(streamEvents[0].type).toEqual(StreamEventType.started);
            expect(streamEvents[1].type).toEqual(StreamEventType.finished);
            expect(streamEvents[1].data.events.test).toEqual(114);
            expect(streamEvents[1].data.updates.test).toEqual(112);
            httpMock.verify();
            done();
        });

        jasmine.clock().mockDate(new Date(Date.UTC(2011, 11, 11)));
        service.emitUpdatedTimeline();

        const updates = httpMock.expectOne(`${environment.API_URL}/store/909/timeline?name=feed.export,feed.import&` +
            `since=2011-12-10T00:00:00.000Z&limit=200&action=ask,start,finish,error,cancel`);
        const events = httpMock.expectOne(`${environment.API_URL}/store/909/timeline?limit=50&name=feed.import,feed.export,order.lifecycle,` +
            `rule.transformation,rule.segmentation&action=create,push,delete,ship,update,error,cancel`);

        updates.flush({test: 112, _embedded: {timeline: []}});
        events.flush({test: 114, _embedded: {timeline: []}});

    });

    it('should send HEAD request to the timeline resource when updates number requested', () => {

        service.getUpdatesNumber().subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/909/timeline`);
        expect(req.request.method).toEqual('HEAD');
        httpMock.verify();
    });

    it('should extract the number of updates from the headers of timeline HEAD response', done => {
        service.getUpdatesNumber().subscribe(count => {
            expect(count).toEqual(676);
            httpMock.verify();
            done();
        });

        let req = httpMock.expectOne(`${environment.API_URL}/store/909/timeline`);
        req.flush({}, {headers: new HttpHeaders().set('X-New-Events-Count', '676')});
    });
});
