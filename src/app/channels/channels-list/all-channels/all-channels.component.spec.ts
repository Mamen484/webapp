import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AllChannelsComponent, searchDebounce } from './all-channels.component';
import { ChannelService, FullCountriesListService } from 'sfl-shared/services';
import { EMPTY, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';

describe('AllChannelsComponent', () => {
    let component: AllChannelsComponent;
    let fixture: ComponentFixture<AllChannelsComponent>;
    let channelService: jasmine.SpyObj<ChannelService>;
    let fullCountriesListService: jasmine.SpyObj<FullCountriesListService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async () => {
        channelService = jasmine.createSpyObj(['listChannels']);
        channelService.listChannels.and.returnValue(EMPTY);
        fullCountriesListService = jasmine.createSpyObj(['getCountries']);
        fullCountriesListService.getCountries.and.returnValue(EMPTY);
        appStore = jasmine.createSpyObj(['select']);
        appStore.select.and.returnValue(EMPTY);

        await TestBed.configureTestingModule({
            declarations: [AllChannelsComponent],
            providers: [
                {provide: ChannelService, useValue: channelService},
                {provide: FullCountriesListService, useValue: fullCountriesListService},
                {provide: Store, useValue: appStore},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AllChannelsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should clear search query when the clearSearch() called', () => {
        component.searchControl.setValue('qwe');
        component.clearSearch();
        expect(component.searchControl.value).toBe('');
    });

    it('should assign channels on init', () => {
        appStore.select.and.returnValue(of({country: 'fr'}));
        component.channels = <any>[{id: 1, _embedded: {country: []}}];
        channelService.listChannels.and.returnValue(of(<any>{
            _embedded: {
                channel: [{id: 2, _embedded: {country: []}}],
            }
        }));
        fixture.detectChanges();
        expect(component.channels).toEqual(<any>[
            {id: 1, _embedded: {country: []}},
            {id: 2, _embedded: {country: []}},
        ]);
    });

    it('should load channels on query change', fakeAsync(() => {
        appStore.select.and.returnValue(of({country: 'fr'}));
        component.channels = <any>[{id: 1, _embedded: {country: []}}];
        channelService.listChannels.and.returnValue(of(<any>{
            _embedded: {
                channel: [{id: 2, _embedded: {country: []}}],
            }
        }));
        fixture.detectChanges();
        component.searchControl.setValue('qwe');
        tick(searchDebounce);
        expect(channelService.listChannels).toHaveBeenCalledTimes(2);
        expect(channelService.listChannels.calls.mostRecent().args[0].search).toBe('qwe');
    }));

    it('should load channels on query change when the query is empty', fakeAsync(() => {
        appStore.select.and.returnValue(of({country: 'fr'}));
        component.channels = <any>[{id: 1, _embedded: {country: []}}];
        channelService.listChannels.and.returnValue(of(<any>{
            _embedded: {
                channel: [{id: 2, _embedded: {country: []}}],
            }
        }));
        fixture.detectChanges();
        component.searchControl.setValue('qwe');
        tick(searchDebounce);
        component.searchControl.setValue('');
        tick(searchDebounce);
        expect(channelService.listChannels).toHaveBeenCalledTimes(3);
        expect(channelService.listChannels.calls.mostRecent().args[0].search).toBe('');
    }));

    it('should load channels on scroll', () => {
        channelService.listChannels.and.returnValue(EMPTY);
        component.hasNextPage = true;
        component.loading = false;
        component.currentPage = 0;
        component.onScroll();
        expect(component.currentPage).toBe(1);
        expect(channelService.listChannels).toHaveBeenCalled();
    });

    it('should NOT load channels on scroll when no more pages', () => {
        channelService.listChannels.and.returnValue(EMPTY);
        component.hasNextPage = false;
        component.loading = false;
        component.currentPage = 0;
        component.onScroll();
        expect(component.currentPage).toBe(0);
        expect(channelService.listChannels).not.toHaveBeenCalled();
    });

    it('should NOT load channels on scroll when some channels are loading', () => {
        channelService.listChannels.and.returnValue(EMPTY);
        component.hasNextPage = true;
        component.loading = true;
        component.currentPage = 0;
        component.onScroll();
        expect(component.currentPage).toBe(0);
        expect(channelService.listChannels).not.toHaveBeenCalled();
    });

    it('should assign countries', () => {
        fullCountriesListService.getCountries.and.returnValue(of([
            {code: 'kp'},
            {code: 'fr'},
            {code: 'us'},
        ]));
        fixture.detectChanges();
        expect(component.countriesList).toEqual([
            {code: 'fr'},
            {code: 'us'},
        ]);
    });
});
