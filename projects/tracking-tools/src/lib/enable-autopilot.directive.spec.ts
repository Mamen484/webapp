import { EnableAutopilotDirective } from './enable-autopilot.directive';
import { of } from 'rxjs';
import { AggregatedUserInfo, Store as UserStore } from 'sfl-shared/entities';
import { SflUserService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';

describe('EnableAutopilotDirective', () => {
    let directive: EnableAutopilotDirective;
    let userService: jasmine.SpyObj<SflUserService>;
    let addEventListenerSpy: jasmine.Spy;
    let autopilotRunSpy: jasmine.Spy;
    let store: jasmine.SpyObj<Store<{ currentStore: UserStore }>>;

    beforeEach(() => {
        userService = jasmine.createSpyObj(['fetchAggregatedInfo']);
        addEventListenerSpy = jasmine.createSpy();
        autopilotRunSpy = jasmine.createSpy();
        store = jasmine.createSpyObj(['select']);
        directive = new EnableAutopilotDirective(userService,
            {
                nativeWindow: {
                    Autopilot: {run: autopilotRunSpy},
                    addEventListener: addEventListenerSpy,
                },
            },
            store,
            'someEmail@default.com',
            'some default storename');

    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should run `autopilot associate()` with store\'s name and user\'s email when stores name equals user\'s login', () => {
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({login: 'login1', email: 'email1', roles: ['user']})));
        store.select.and.returnValue(
            of({name: 'login1', permission: {}})
        );
        addEventListenerSpy.and.callFake((type, fn) => {
            fn();
        });
        directive.ngOnInit();
        expect(autopilotRunSpy).toHaveBeenCalledWith('associate', {
            _simpleAssociate: true,
            Email: 'email1',
            FirstName: 'login1',
        });
    });

    it('should run `autopilot associate()` with default name and email when the user\'s login differs from the store\'s name', () => {
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({login: 'login1', email: 'email1', roles: ['user']})));
        store.select.and.returnValue(
            of({name: 'login2', permission: {}})
        );
        addEventListenerSpy.and.callFake((type, fn) => {
            fn();
        });
        directive.ngOnInit();
        expect(autopilotRunSpy).toHaveBeenCalledWith('associate', {
            _simpleAssociate: true,
            Email: 'someEmail@default.com',
            FirstName: 'some default storename',
        });
    });

    it('should NOT run `autopilot associate()` when the user is admin', () => {
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            login: 'login1',
            email: 'email1',
            roles: ['admin']
        })));
        store.select.and.returnValue(
            of({name: 'login2', permission: {}})
        );
        addEventListenerSpy.and.callFake((type, fn) => {
            fn();
        });
        directive.ngOnInit();
        expect(autopilotRunSpy).not.toHaveBeenCalled();
    });
});
