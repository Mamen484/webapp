import { TestBed } from '@angular/core/testing';

import {
    ChannelStorageService,
    MAX_ONLINE_DEVIATION,
    MAX_TURNOVER_DEVIATION,
    MIN_ONLINE,
    MIN_TURNOVER,
    ONLINE_STORAGE_KEY,
    TURNOVER_STORAGE_KEY
} from './channel-storage.service';
import { SflLocalStorageService } from 'sfl-shared/services';

describe('ChannelStorageService', () => {
    let localStorage: jasmine.SpyObj<SflLocalStorageService>;
    let service: ChannelStorageService;
    beforeEach(() => {

        localStorage = jasmine.createSpyObj(['getItem', 'setItem']);

        TestBed.configureTestingModule({
            providers: [
                {provide: SflLocalStorageService, useValue: localStorage},
            ],
        });

        service = TestBed.get(ChannelStorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a value from a local storage if it exists for a potential turnover', () => {
        localStorage.getItem.and.returnValue(`{"48": "45.14", "52": "41"}`);
        expect(service.getGeneratedTurnover(48)).toBe('45.14');
    });

    it('should return a value from a local storage if it exists for a number of connected clients', () => {
        localStorage.getItem.and.returnValue(`{"50": "5", "52": "41"}`);
        expect(service.getGeneratedOnline(50)).toBe('5');
    });

    it('should generate a new value if it doesn`t exists in a local storage for a potential turnover', () => {
        localStorage.getItem.and.returnValue(`{"48": "45.14", "52": "41"}`);
        const turnover = service.getGeneratedTurnover(12);
        expect(turnover).toBeGreaterThanOrEqual(MIN_TURNOVER);
        expect(turnover).toBeLessThanOrEqual(MIN_TURNOVER + MAX_TURNOVER_DEVIATION);
    });

    it('should a generated value of a potential turnover into the localStorage', () => {
        localStorage.getItem.and.returnValue(`{"48": "45.14", "52": "41"}`);
        service.getGeneratedTurnover(12);
        expect(localStorage.setItem.calls.mostRecent().args[0][12]).toBeDefined();
    });

    it('should generate a new value if it doesn`t exists in a local storage for a connected clients', () => {
        localStorage.getItem.and.returnValue(`{"48": "45.14", "52": "41"}`);
        const turnover = service.getGeneratedOnline(12);
        expect(turnover).toBeGreaterThanOrEqual(MIN_ONLINE);
        expect(turnover).toBeLessThanOrEqual(MIN_ONLINE + MAX_ONLINE_DEVIATION);
    });

    it('should a generated value of a connected clients into the localStorage', () => {
        localStorage.getItem.and.returnValue(`{"48": "45.14", "52": "41"}`);
        service.getGeneratedOnline(12);
        expect(localStorage.setItem.calls.mostRecent().args[0][12]).toBeDefined();
    });

    it('should create a new channel cache for a turnover if there is no one in the local storage', () => {
        localStorage.getItem.and.returnValue(undefined);
        const turnover = service.getGeneratedTurnover(12);
        expect(localStorage.setItem).toHaveBeenCalledWith(TURNOVER_STORAGE_KEY, `{"12":${turnover}}`);
    });

    it('should create a new channel cache for a online if there is no one in the local storage', () => {
        localStorage.getItem.and.returnValue(undefined);
        const online = service.getGeneratedOnline(12);
        expect(localStorage.setItem).toHaveBeenCalledWith(ONLINE_STORAGE_KEY, `{"12":${online}}`);
    });
});
