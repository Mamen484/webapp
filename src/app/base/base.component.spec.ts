import { EMPTY, of } from 'rxjs';
import { BaseComponent } from './base.component';
import { environment } from '../../environments/environment';
import { StoreService } from 'sfl-shared/services';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { SflUserService } from 'sfl-shared/services';

describe('BaseComponent', () => {

    let store, window = {Autopilot: <any>{}};
    let storeService: jasmine.SpyObj<StoreService>;
    let userService: jasmine.SpyObj<SflUserService>;
    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo'])
        window.Autopilot = jasmine.createSpyObj('Autopilot', ['run']);
        storeService = jasmine.createSpyObj('StoreService', ['getStoreChannels']);
    });

    it('should run `autopilot associate()` with store\'s name and user\'s email when stores name equals user\'s login', () => {
        store.select.and.returnValues(
                of({name: 'login1'}),
                EMPTY,
                EMPTY,
            );
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({login: 'login1', email: 'email1', roles: ['user']})));
        let component = new BaseComponent(store, <any>{nativeWindow: window}, storeService, <any>{}, userService);
        expect(window.Autopilot.run.calls.mostRecent().args[0]).toEqual('associate');
        expect(window.Autopilot.run.calls.mostRecent().args[1]._simpleAssociate).toEqual(true);
        expect(window.Autopilot.run.calls.mostRecent().args[1].Email).toEqual('email1');
        expect(window.Autopilot.run.calls.mostRecent().args[1].FirstName).toEqual('login1');
    });

    it('should run `autopilot associate()` with default name and email when the user\'s login differs from the store\'s name', () => {
        store.select.and.returnValues(
            of({name: 'login2'}),
            EMPTY,
            EMPTY,
        );
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({login: 'login1', email: 'email1', roles: ['user']})));
        let component = new BaseComponent(store, <any>{nativeWindow: window}, storeService, <any>{}, userService);
        expect(window.Autopilot.run.calls.mostRecent().args[0]).toEqual('associate');
        expect(window.Autopilot.run.calls.mostRecent().args[1]._simpleAssociate).toEqual(true);
        expect(window.Autopilot.run.calls.mostRecent().args[1].Email).toEqual(environment.DEFAULT_AUTOPILOT_EMAIL);
        expect(window.Autopilot.run.calls.mostRecent().args[1].FirstName).toEqual(environment.DEFAULT_AUTOPILOT_STORENAME);
    });

    it('should NOT run `autopilot associate()` when the user is admin', () => {
        store.select.and.returnValues(
            of({name: 'login2'}),
            EMPTY,
            EMPTY,
        );
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({login: 'login1', email: 'email1', roles: ['admin']})));
        const component = new BaseComponent(store, <any>{nativeWindow: window}, storeService, <any>{}, userService);
        expect(window.Autopilot.run).not.toHaveBeenCalled();
    });
});
