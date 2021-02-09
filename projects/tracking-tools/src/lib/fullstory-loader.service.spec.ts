import { TestBed } from '@angular/core/testing';

import { FullstoryLoaderService } from './fullstory-loader.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../src/app/core/entities/app-state';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { of } from 'rxjs';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { FULLSTORY_ORG_ID } from './variables';

describe('FullstoryLoaderService', () => {

    let store: jasmine.SpyObj<Store<AppState>>;
    let userService: jasmine.SpyObj<SflUserService>;
    let windowRef = <any>{};

    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        windowRef.nativeWindow = {
            FS: {identify: jasmine.createSpy()},
        };

        TestBed.configureTestingModule({
            providers: [
                {provide: Store, useValue: store},
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: SflUserService, useValue: userService},
                {provide: FULLSTORY_ORG_ID, useValue: 'some org id'},
            ],
        });
    });

    it('should be created', () => {
        const service: FullstoryLoaderService = TestBed.get(FullstoryLoaderService);
        expect(service).toBeTruthy();
    });

    it('should load and activate fullstory on load()', () => {
        const service: FullstoryLoaderService = TestBed.get(FullstoryLoaderService);
        store.select.and.returnValue(of({
            id: 'some_id',
            name: 'some_name',
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            email: 'some_email'
        })));
        service.load();
        expect(windowRef.nativeWindow.FS.identify).toHaveBeenCalledWith('some_id', {
            displayName: 'some_name',
            email: 'some_email',
        });
    });

    it('should not load twice', () => {
        const service: FullstoryLoaderService = TestBed.get(FullstoryLoaderService);
        store.select.and.returnValue(of({
            id: 'some_id',
            name: 'some_name',
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            email: 'some_email'
        })));
        service.load();
        service.load();
        expect(windowRef.nativeWindow.FS.identify).toHaveBeenCalledTimes(1);
    });

});
