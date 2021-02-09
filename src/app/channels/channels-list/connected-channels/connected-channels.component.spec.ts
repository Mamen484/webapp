import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ConnectedChannelsComponent, searchDebounce } from './connected-channels.component';
import { EMPTY, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectedChannelsDataService } from './connected-channels-data.service';

describe('ConnectedChannelsComponent', () => {
    let component: ConnectedChannelsComponent;
    let fixture: ComponentFixture<ConnectedChannelsComponent>;

    let connectedDataService: jasmine.SpyObj<ConnectedChannelsDataService>;


    beforeEach(async () => {
        connectedDataService = jasmine.createSpyObj(['getStatistics', 'getChannels']);

        await TestBed.configureTestingModule({
            declarations: [ConnectedChannelsComponent],
            providers: [
                {provide: ConnectedChannelsDataService, useValue: connectedDataService},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConnectedChannelsComponent);
        component = fixture.componentInstance;
        connectedDataService.getChannels.and.returnValue(EMPTY);
        connectedDataService.getStatistics.and.returnValue(of(<any>{channel: []}));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign assign the statistics', () => {
        connectedDataService.getStatistics.and.returnValue(of(<any>{
            statistics: {
                0: {id: 0, revenue: 12},
                2: {id: 2, revenue: 123},
                5: {id: 5, revenue: 4321},
            }
        }));
        fixture.detectChanges();
        expect(component.statistics).toEqual(<any>{
            0: {id: 0, revenue: 12},
            2: {id: 2, revenue: 123},
            5: {id: 5, revenue: 4321},
        });
    });

    it('should assign channels on init', () => {
        component.channels = <any>[{id: 1, _embedded: {channel: {}}}];
        connectedDataService.getChannels.and.returnValue(of({
            channels: <any>[{id: 2, _embedded: {channel: {}}}],
            page: 1,
            pages: 1,
        }));
        fixture.detectChanges();
        expect(component.channels).toEqual(<any>[{id: 1, _embedded: {channel: {}}}, {id: 2, _embedded: {channel: {}}}]);
    });

    it('should load channels on query change', fakeAsync(() => {
        component.channels = <any>[{id: 1, _embedded: {channel: {}}}];
        connectedDataService.getChannels.and.returnValue(of({
            channels: <any>[{id: 2, _embedded: {channel: {}}}],
            page: 1,
            pages: 1,
        }));
        fixture.detectChanges();
        component.searchControl.setValue('qwe');
        tick(searchDebounce);
        expect(component.filter.searchQuery).toEqual('qwe');
        expect(connectedDataService.getChannels).toHaveBeenCalledTimes(2);
    }));

    it('should load channels on query change when query is empty', fakeAsync(() => {
        component.channels = <any>[{id: 1, _embedded: {channel: {}}}];
        connectedDataService.getChannels.and.returnValue(of({
            channels: <any>[{id: 2, _embedded: {channel: {}}}],
            page: 1,
            pages: 1,
        }));
        fixture.detectChanges();
        component.searchControl.setValue('qwe');
        tick(searchDebounce);
        component.searchControl.setValue('');
        tick(searchDebounce);
        expect(component.filter.searchQuery).toEqual('');
        expect(connectedDataService.getChannels).toHaveBeenCalledTimes(3);
    }));

    it('should load channels on scroll', () => {
        connectedDataService.getChannels.and.returnValue(EMPTY);
        component.hasNextPage = true;
        component.loadingChannels = false;
        component.filter.page = 0;
        component.onScroll();
        expect(component.filter.page).toBe(1);
        expect(connectedDataService.getChannels).toHaveBeenCalled();
    });

    it('should NOT load channels on scroll when the page is last', () => {
        connectedDataService.getChannels.and.returnValue(EMPTY);
        component.hasNextPage = false;
        component.loadingChannels = false;
        component.filter.page = 0;
        component.onScroll();
        expect(component.filter.page).toBe(0);
        expect(connectedDataService.getChannels).not.toHaveBeenCalled();
    });

    it('should NOT load channels on scroll when channels are currently being loaded', () => {
        connectedDataService.getChannels.and.returnValue(EMPTY);
        component.hasNextPage = true;
        component.loadingChannels = true;
        component.filter.page = 0;
        component.onScroll();
        expect(component.filter.page).toBe(0);
        expect(connectedDataService.getChannels).not.toHaveBeenCalled();
    });

    it('should clear search query when the clearSearch() called', () => {
        component.searchControl.setValue('qwe');

        component.clearSearch();
        expect(component.searchControl.value).toBe('');
    });
});
