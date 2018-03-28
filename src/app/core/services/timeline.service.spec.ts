import { TimelineService } from './timeline.service';
import { Observable } from 'rxjs/Observable';
import { Timeline } from '../entities/timeline';
import { TimelineUpdate } from '../entities/timeline-update';
import { HttpClient } from '@angular/common/http';
import { data } from '../../../mocks/updates-for-timeline-service.mock';
import { environment } from '../../../environments/environment';

describe('TimelineService', () => {

    let service;
    let httpClient: jasmine.SpyObj<HttpClient>;
    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['get']);
        service = new TimelineService(httpClient);
    });

    it('should create an array of distinct updates: only the one last import and one last export of each channel', () => {
        httpClient.get.and.returnValue(Observable.of(data));

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
    });

    it('should pass proper params on getEvents call', () => {
        service.getEvents(114);
        expect(httpClient.get.calls.mostRecent().args[0]).toEqual(`${environment.API_URL}/store/114/timeline`);
        expect(httpClient.get.calls.mostRecent().args[1].params.get('name'))
            .toEqual('feed.import,feed.export,order.lifecycle,rule.transformation,rule.segmentation');
        expect(httpClient.get.calls.mostRecent().args[1].params.get('action'))
            .toEqual('create,push,delete,ship,update,error');
    });

    it('should pass proper params on getEventUpdates call', () => {
        httpClient.get.and.returnValue(Observable.of({_embedded: {timeline: []}}));
        service.getEventUpdates(118);
        expect(httpClient.get.calls.mostRecent().args[0]).toEqual(`${environment.API_URL}/store/118/timeline`);
        expect(httpClient.get.calls.mostRecent().args[1].params.get('name'))
            .toEqual('feed.export,feed.import');
        expect(httpClient.get.calls.mostRecent().args[1].params.get('action')).toEqual('ask,start,finish,error');
    });
});
