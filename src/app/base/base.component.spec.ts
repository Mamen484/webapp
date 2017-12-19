import { Observable } from 'rxjs/Observable';
import { BaseComponent } from './base.component';
import { environment } from '../../environments/environment';
import { StoreService } from '../core/services/store.service';

describe('BaseComponent', () => {

    let store, window = {Autopilot: <any>{}};
    let storeService: jasmine.SpyObj<StoreService>;
    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select']);
        window.Autopilot = jasmine.createSpyObj('Autopilot', ['run']);
        storeService = jasmine.createSpyObj('StoreService', ['getStoreChannels']);
    });

    it ('should run autopilot associate with store\'s name and user\'s email', () => {
        store.select.and.returnValues(
            Observable.of({login: 'login1', email: 'email1'}),
            Observable.of({name: 'login1'}),
            Observable.empty(),
        );
        let component = new BaseComponent(store, <any>{nativeWindow: window}, storeService);
        expect(window.Autopilot.run.calls.mostRecent().args[0]).toEqual('associate');
        expect(window.Autopilot.run.calls.mostRecent().args[1]._simpleAssociate).toEqual(true);
        expect(window.Autopilot.run.calls.mostRecent().args[1].Email).toEqual('email1');
        expect(window.Autopilot.run.calls.mostRecent().args[1].FirstName).toEqual('login1');
    });

    it ('should run autopilot associate with store\'s name and user\'s email', () => {
        store.select.and.returnValues(
            Observable.of({login: 'login1', email: 'email1'}),
            Observable.of({name: 'login2'}),
            Observable.empty(),
        );
        let component = new BaseComponent(store, <any>{nativeWindow: window}, storeService);
        expect(window.Autopilot.run.calls.mostRecent().args[0]).toEqual('associate');
        expect(window.Autopilot.run.calls.mostRecent().args[1]._simpleAssociate).toEqual(true);
        expect(window.Autopilot.run.calls.mostRecent().args[1].Email).toEqual(environment.DEFAULT_AUTOPILOT_EMAIL);
        expect(window.Autopilot.run.calls.mostRecent().args[1].FirstName).toEqual(environment.DEFAULT_AUTOPILOT_STORENAME);
    });
});
