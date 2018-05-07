import { of } from 'rxjs';
import { BaseComponent } from './base.component';
import { environment } from '../../environments/environment';

describe('BaseComponent', () => {

    let store, window = {Autopilot: <any>{}};
    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select']);
        window.Autopilot = jasmine.createSpyObj('Autopilot', ['run']);
    });

    it ('should run autopilot associate with store\'s name and user\'s email', () => {
        store.select.and.returnValues(
            of({login: 'login1', email: 'email1'}),
            of({name: 'login1'})
        );
        let component = new BaseComponent(store, <any>{nativeWindow: window});
        expect(window.Autopilot.run.calls.mostRecent().args[0]).toEqual('associate');
        expect(window.Autopilot.run.calls.mostRecent().args[1]._simpleAssociate).toEqual(true);
        expect(window.Autopilot.run.calls.mostRecent().args[1].Email).toEqual('email1');
        expect(window.Autopilot.run.calls.mostRecent().args[1].FirstName).toEqual('login1');
    });

    it ('should run autopilot associate with store\'s name and user\'s email', () => {
        store.select.and.returnValues(
            of({login: 'login1', email: 'email1'}),
            of({name: 'login2'})
        );
        let component = new BaseComponent(store, <any>{nativeWindow: window});
        expect(window.Autopilot.run.calls.mostRecent().args[0]).toEqual('associate');
        expect(window.Autopilot.run.calls.mostRecent().args[1]._simpleAssociate).toEqual(true);
        expect(window.Autopilot.run.calls.mostRecent().args[1].Email).toEqual(environment.DEFAULT_AUTOPILOT_EMAIL);
        expect(window.Autopilot.run.calls.mostRecent().args[1].FirstName).toEqual(environment.DEFAULT_AUTOPILOT_STORENAME);
    });
});
