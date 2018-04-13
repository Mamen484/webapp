import { StreamEventType, TimelineService } from './timeline.service';
import { Timeline } from '../entities/timeline';
import { TimelineUpdate } from '../entities/timeline-update';
import { data } from '../../../mocks/updates-for-timeline-service.mock';
import { environment } from '../../../environments/environment';
import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

describe('TimelineService', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [TimelineService],
            imports: [HttpClientTestingModule]
        });
    }));

    it('should pass proper params on getEvents call',
        inject([TimelineService, HttpTestingController], (service: TimelineService, httpMock: HttpTestingController) => {
            service.getEvents(114).subscribe(() => {
                httpMock.expectOne(`${environment.API_URL}/store/114/timeline?name=rule.transformation,rule.segmentation,order.lifecycle,feed.import,feed.export&action=create,push,delete,ship,update,error`);
                httpMock.verify();
            });
        }));

    it('should pass proper params on getEventUpdates call',
        inject([TimelineService, HttpTestingController], (service: TimelineService, httpMock: HttpTestingController) => {
            jasmine.clock().mockDate(new Date(Date.UTC(2011, 11, 11)));
            service.getEventUpdates(118).subscribe();

            let req = httpMock.expectOne(`${environment.API_URL}/store/118/timeline?name=feed.export,feed.import&since=2011-12-10T00:00:00.000Z&limit=200&action=ask,start,finish,error`);
            req.flush({_embedded: {timeline: []}});
            httpMock.verify();
        }));

    it('should create an array of distinct updates: only the one last import and one last export of each channel',
        inject([TimelineService, HttpTestingController], (service: TimelineService, httpMock: HttpTestingController) => {
            jasmine.clock().mockDate(new Date(Date.UTC(2011, 11, 11)));
            service.getEventUpdates(307).subscribe((updates: Timeline<TimelineUpdate>) => {
                let upd = updates._embedded.timeline;
                // feed.import
                expect(upd[0].id).toEqual('59e0dcb1ae7b3b02694c3ff1');

                // feed.export - SmartFeed
                expect(upd[1].id).toEqual('59e0dcb2ae7b3b02694c3ff3');

                // feed export - Amazon
                expect(upd[2].id).toEqual('59e0dc80ae7b3b02656ab2c3');
                expect(upd.length).toEqual(3);
            });
            let req = httpMock.expectOne(`${environment.API_URL}/store/307/timeline?name=feed.export,feed.import&since=2011-12-10T00:00:00.000Z&limit=200&action=ask,start,finish,error`);
            req.flush(data);
            httpMock.verify();

        }));


    it('should fetch both events and updates when timeline update emitted', inject([TimelineService, HttpTestingController], (service: TimelineService, httpMock: HttpTestingController) => {
        jasmine.clock().mockDate(new Date(Date.UTC(2011, 11, 11)));
        service.emitUpdatedTimeline(124);
        console.log(httpMock);
        httpMock.expectOne(`${environment.API_URL}/store/124/timeline?name=feed.export,feed.import&since=2011-12-10T00:00:00.000Z&limit=200&action=ask,start,finish,error`);
        httpMock.expectOne(`${environment.API_URL}/store/124/timeline?name=feed.import,feed.export,order.lifecycle,rule.transformation,rule.segmentation&action=create,push,delete,ship,update,error`);
        httpMock.verify();

    }));

    it('should pass to subscribers two events: fetch start (empty) and fetch finish (with data) when updated timeline is requested', done => {
        let service = TestBed.get(TimelineService);
        let httpMock = TestBed.get(HttpTestingController);
        service.getTimelineStream().take(2).toArray().subscribe(streamEvents => {
            expect(streamEvents.length).toEqual(2);
            expect(streamEvents[0].type).toEqual(StreamEventType.started);
            expect(streamEvents[1].type).toEqual(StreamEventType.finished);
            expect(streamEvents[1].data.events.test).toEqual(114);
            expect(streamEvents[1].data.updates.test).toEqual(112);
            httpMock.verify();
            done();
        });


        jasmine.clock().mockDate(new Date(Date.UTC(2011, 11, 11)));
        service.emitUpdatedTimeline(116);

        let updates = httpMock.expectOne(`${environment.API_URL}/store/116/timeline?name=feed.export,feed.import&since=2011-12-10T00:00:00.000Z&limit=200&action=ask,start,finish,error`);
        let events = httpMock.expectOne(`${environment.API_URL}/store/116/timeline?name=feed.import,feed.export,order.lifecycle,rule.transformation,rule.segmentation&action=create,push,delete,ship,update,error`);

        updates.flush({test: 112, _embedded: {timeline: []}});
        events.flush({test: 114, _embedded: {timeline: []}});

    });

    it('should send HEAD request to the timeline resource when updates number requested', () => {
        let service: TimelineService = TestBed.get(TimelineService);
        let httpMock: HttpTestingController = TestBed.get(HttpTestingController);

        service.getUpdatesNumber(11).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/11/timeline`);
        expect(req.request.method).toEqual('HEAD');
        httpMock.verify();
    });

    it('should extract the number of updates from the headers of timeline HEAD response', done => {
        let service: TimelineService = TestBed.get(TimelineService);
        let httpMock: HttpTestingController = TestBed.get(HttpTestingController);

        service.getUpdatesNumber(11).subscribe(count => {
            expect(count).toEqual(676);
            httpMock.verify();
            done();
        });

        let req = httpMock.expectOne(`${environment.API_URL}/store/11/timeline`);
        req.flush({}, {headers: new HttpHeaders().set('X-New-Events-Count', '676')});
    });


});
