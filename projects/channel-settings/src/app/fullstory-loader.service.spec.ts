import {TestBed} from '@angular/core/testing';

import {FullstoryLoaderService} from './fullstory-loader.service';
import {SflUserService, SflWindowRefService} from 'sfl-shared/services';
import {of} from 'rxjs';
import {AggregatedUserInfo, StoreStatus} from 'sfl-shared/entities';

describe('FullstoryLoaderService', () => {

    let userService: jasmine.SpyObj<SflUserService>;
    let windowRef = <any>{};

    beforeEach(() => {
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        windowRef.nativeWindow = {
            FS: {identify: jasmine.createSpy()},
        };

        TestBed.configureTestingModule({
            providers: [
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: SflUserService, useValue: userService},
            ],
        });
    });

    it('should be created', () => {
        const service: FullstoryLoaderService = TestBed.get(FullstoryLoaderService);
        expect(service).toBeTruthy();
    });

    it('should load and activate fullstory on load()', () => {
        const service: FullstoryLoaderService = TestBed.get(FullstoryLoaderService);
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            email: 'some_email',
            roles: ['user'],
            _embedded: {
                store: [{
                    id: 1,
                    status: StoreStatus.active,
                }, {
                    id: 2,
                    status: StoreStatus.demo,
                    name: 'demo_store'
                }]
            }

        })));
        service.load();
        expect(windowRef.nativeWindow.FS.identify).toHaveBeenCalledWith(2, {
            displayName: 'demo_store',
            email: 'some_email',
        });
    });

    it('should NOT load for admin', () => {
        const service: FullstoryLoaderService = TestBed.get(FullstoryLoaderService);
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            email: 'some_email',
            roles: ['admin'],
            _embedded: {
                store: [{
                    id: 1,
                    status: StoreStatus.active,
                }, {
                    id: 2,
                    status: StoreStatus.demo,
                    name: 'demo_store'
                }]
            }

        })));
        service.load();
        expect(windowRef.nativeWindow.FS.identify).not.toHaveBeenCalled();
    });

    it('should not load twice', () => {
        const service: FullstoryLoaderService = TestBed.get(FullstoryLoaderService);
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            email: 'some_email',
            roles: ['user'],
            _embedded: {
                store: [{
                    id: 2,
                    status: StoreStatus.demo,
                    name: 'demo_store'
                }]
            }
        })));
        service.load();
        service.load();
        expect(windowRef.nativeWindow.FS.identify).toHaveBeenCalledTimes(1);
    });

});
