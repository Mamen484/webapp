import { TestBed } from '@angular/core/testing';

import { ConnectedChannelsDataService } from './connected-channels-data.service';
import { StoreService } from 'sfl-shared/services';
import { EMPTY, of } from 'rxjs';

describe('ConnectedChannelsDataService', () => {
    let service: ConnectedChannelsDataService;
    let storeService: jasmine.SpyObj<StoreService>;

    beforeEach(() => {
        storeService = jasmine.createSpyObj(['fetchStatistics', 'getInstalledChannels']);
        TestBed.configureTestingModule({
            providers: [
                {provide: StoreService, useValue: storeService},
            ],
        });
        service = TestBed.inject(ConnectedChannelsDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch statistics on getStatistics() call', () => {
        storeService.fetchStatistics.and.returnValue(EMPTY);
        service.getStatistics().subscribe();
        expect(storeService.fetchStatistics).toHaveBeenCalled();
    });

    it('should the key-valued map of channels statistics', async () => {
        storeService.fetchStatistics.and.returnValue(of(<any>{
            _embedded: {
                channel: [
                    {id: 1},
                    {id: 2},
                    {id: 5},
                ]
            }
        }));
        const {statistics} = await service.getStatistics().toPromise();
        expect(statistics).toEqual({
            1: {id: 1},
            2: {id: 2},
            5: {id: 5},
        });
    });

    it('should return an empty object if no channel statistics available', async () => {
        storeService.fetchStatistics.and.returnValue(of(<any>{}));
        const {statistics} = await service.getStatistics().toPromise();
        expect(statistics).toEqual({});
    });

    it('should assign the currency', async () => {
        storeService.fetchStatistics.and.returnValue(of(<any>{
            currency: 'EUR'
        }));
        const {currency} = await service.getStatistics().toPromise();
        expect(currency).toEqual('EUR');
    });

    it('should fetch installed channels on getChannels() call', () => {
        storeService.getInstalledChannels.and.returnValue(EMPTY);
        service.getChannels({}).subscribe();
        expect(storeService.getInstalledChannels).toHaveBeenCalledWith(<any>{});
    });

    it('should return mapped channels data on getChannels() call', async () => {
        storeService.getInstalledChannels.and.returnValue(of({
            page: 32,
            pages: 123,
            _embedded: {storeChannel: []}
        }));
        const response = await service.getChannels({}).toPromise();
        expect(response).toEqual({
            page: 32,
            pages: 123,
            channels: [],
        });

    });
});
