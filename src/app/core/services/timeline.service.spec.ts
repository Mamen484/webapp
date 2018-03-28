import { TimelineService } from './timeline.service';
import { Timeline } from '../entities/timeline';
import { TimelineUpdate } from '../entities/timeline-update';
import { HttpClient } from '@angular/common/http';
import { data } from '../../../mocks/updates-for-timeline-service.mock';
import { environment } from '../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TimelineFilter } from '../entities/timeline-filter';
import { TimelineEventName } from '../entities/timeline-event-name.enum';
import { TimelineEventAction } from '../entities/timeline-event-action.enum';

describe('TimelineService', () => {

    let service;
    let httpClient: jasmine.SpyObj<HttpClient>;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TimelineService],
            imports: [HttpClientTestingModule]
        });

        service = TestBed.get(TimelineService);
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);

        let baseTime = new Date(Date.UTC(2017, 5, 14, 2, 22, 41));
        jasmine.clock().mockDate(baseTime);
    });

    it('should create an array of distinct updates: only the one last import and one last export of each channel', () => {


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

        let req = httpTestingController.expectOne(
            `${environment.API_URL}/store/307/timeline?name=feed.export,feed.import&since=2017-06-13T02:22:41.000Z&limit=200&action=ask,start,finish,error`
        );

        req.flush(data);

        httpTestingController.verify();

    });

    it('should pass proper params on getEvents call', () => {
        service.getEvents(114).subscribe();

        httpTestingController.expectOne(
            `${environment.API_URL}/store/114/timeline?name=feed.import,feed.export,order.lifecycle,rule.transformation,rule.segmentation&action=create,push,delete,ship,update,error`
        );

        httpTestingController.verify();
    });

    it('should fetch appropriate link on getEventsByLink call', () => {
        service.getEventsByLink('/v1/store/307/timeline?name=feed.import&feed.export&order.lifecycle&rule.transformation&rule.segmentation&action=create&push&delete&ship&update&error&page=2&limit=10').subscribe();
        httpTestingController.expectOne(
            `${environment.API_URL_WITHOUT_VERSION}/v1/store/307/timeline?name=feed.import&feed.export&order.lifecycle&rule.transformation&rule.segmentation&action=create&push&delete&ship&update&error&page=2&limit=10`
        );
    });

    it('should pass proper params on getEventUpdates call', () => {
        service.getEventUpdates(118).subscribe();

        httpTestingController.expectOne(
            `${environment.API_URL}/store/118/timeline?name=feed.export,feed.import&since=2017-06-13T02:22:41.000Z&limit=200&action=ask,start,finish,error`
        );
    });

    it('should use TimelinFilter to set params of getEvents request', () => {
        let filter = new TimelineFilter();
        filter.name = [TimelineEventName.ruleSegmentation, TimelineEventName.orderLifecycle];
        filter.action = [TimelineEventAction.delete, TimelineEventAction.ship];
        filter.since = new Date();
        filter.until = new Date(new Date().getTime() + 2000);

        service.getEvents(115, filter).subscribe();
        httpTestingController.expectOne(
            `${environment.API_URL}/store/115/timeline?name=rule.segmentation,order.lifecycle&action=delete,ship&since=2017-06-14T02:22:41.000Z&until=2017-06-14T02:22:43.000Z`
        );
    });
});
