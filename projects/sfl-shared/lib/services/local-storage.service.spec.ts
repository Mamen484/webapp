import { TestBed, inject } from '@angular/core/testing';

import { SflLocalStorageService } from './local-storage.service';
import { SflWindowRefService } from './window-ref.service';

describe('SflLocalStorageService', () => {
    let localStorage: jasmine.SpyObj<Storage>;
    let service;
    beforeEach(() => {
        localStorage = jasmine.createSpyObj('SflLocalStorageService', ['getItem', 'removeItem', 'setItem', 'clear', 'key']);
        TestBed.configureTestingModule({
            providers: [
                SflLocalStorageService,
                {provide: SflWindowRefService, useValue: {nativeWindow: {localStorage}}}
            ]
        });
    });

    beforeEach(() => {
        service = TestBed.get(SflLocalStorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getItem should should call getItem on a window.localStorage', () => {
        service.getItem('item1');
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith('item1')
    });

    it('removeItem should should call removeItem on a window.localStorage', () => {
        service.removeItem('item2');
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(localStorage.removeItem).toHaveBeenCalledWith('item2')

    });

    it('setItem should call setItem on a window.localStorage', () => {
        service.setItem('123', '321');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('123', '321');
    });

    it('clear should call clear on a window.localStorage', () => {
        service.clear();
        expect(localStorage.clear).toHaveBeenCalledTimes(1);
    });

    it('key should call key on a window.localStorage', () => {
        service.key(1);
        expect(localStorage.key).toHaveBeenCalledTimes(1);
        expect(localStorage.key).toHaveBeenCalledWith(1);
    });

    it('length should get length from a window.localStorage',
        inject([SflWindowRefService], (windowRef) => {
            windowRef.nativeWindow.localStorage.length = 22;
            expect(service.length).toEqual(22);
        }));
});
