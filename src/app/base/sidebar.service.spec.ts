import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SidebarService } from './sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsDataService } from '../tickets/tickets-list/tickets-data.service';
import { TimelineService } from 'sfl-shared/services';

describe('SidebarService', () => {
    let service: SidebarService;
    let router: jasmine.SpyObj<Router>;
    let ticketsDataService: jasmine.SpyObj<TicketsDataService>;
    let timelineService: jasmine.SpyObj<TimelineService>;
    let route: any;

    beforeEach(() => {
        router = jasmine.createSpyObj(['isActive', 'navigate']);
        ticketsDataService = jasmine.createSpyObj(['requestUpdate']);
        timelineService = jasmine.createSpyObj(['emitUpdatedTimeline']);
        route = {snapshot: {}};
        TestBed.configureTestingModule({
            providers: [
                {provide: Router, useValue: router},
                {provide: TicketsDataService, useValue: ticketsDataService},
                {provide: TimelineService, useValue: timelineService},
                {provide: ActivatedRoute, useValue: route},
            ],
        });
        service = TestBed.inject(SidebarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should reload timeline when navigateToTimeline clicked', fakeAsync(() => {
        router.routeReuseStrategy = <any>{shouldDetach: () => {}};
        router.navigate.and.returnValue(Promise.resolve(null));
        service.navigateToTimeline();
        tick();
        expect(timelineService.emitUpdatedTimeline).toHaveBeenCalled();
    }));

    it('should NOT reload timeline when navigateToTimeline clicked and the user`s not on timline', fakeAsync(() => {
        router.routeReuseStrategy = <any>{shouldDetach: () => {}};
        router.navigate.and.returnValue(Promise.resolve(true));
        service.navigateToTimeline();
        tick();
        expect(timelineService.emitUpdatedTimeline).not.toHaveBeenCalled();
    }));
});
