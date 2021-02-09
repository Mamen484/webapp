import { EnableFullstoryDirective } from './enable-fullstory.directive';
import { of } from 'rxjs';
import { AggregatedUserInfo, Store as UserStore } from 'sfl-shared/entities';
import { Store } from '@ngrx/store';
import { SflUserService } from 'sfl-shared/services';
import { FullstoryLoaderService } from './fullstory-loader.service';

describe('EnableFullstoryDirective', () => {

    let directive: EnableFullstoryDirective;
    let store: jasmine.SpyObj<Store<{currentStore: UserStore}>>;
    let userService: jasmine.SpyObj<SflUserService>;
    let fullstoryLoaderService: jasmine.SpyObj<FullstoryLoaderService>;

    beforeEach(() => {
        store = jasmine.createSpyObj(['select']);
        userService = jasmine.createSpyObj(['fetchAggregatedInfo']);
        fullstoryLoaderService = jasmine.createSpyObj(['load']);

        directive = new EnableFullstoryDirective(store, userService, fullstoryLoaderService);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });


    it('should run fullstory code if the user is not admin, the store is created less then 7 days before' +
        ' and the country is US', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'US',
            createdAt: '2025-12-15T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        directive.ngOnInit();
        expect(fullstoryLoaderService.load).toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the user has role admin', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'US',
            createdAt: '2025-12-15T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['admin'],
            token: 'token_1',
            email: 'some_email'
        })));
        directive.ngOnInit();
        expect(fullstoryLoaderService.load).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the user has role employee', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'US',
            createdAt: '2025-12-15T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['employee'],
            token: 'token_1',
            email: 'some_email'
        })));
        directive.ngOnInit();
        expect(fullstoryLoaderService.load).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the store is created more then then 7 days before', () => {
        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'US',
            createdAt: '2025-12-10T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        directive.ngOnInit();
        expect(fullstoryLoaderService.load).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the store country is not US', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'FR',
            createdAt: '2025-12-15T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        directive.ngOnInit();
        expect(fullstoryLoaderService.load).not.toHaveBeenCalled();
    });
});
