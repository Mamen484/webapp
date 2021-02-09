import { EnableSalesMachineDirective } from './enable-sales-machine.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../src/app/core/entities/app-state';
import { SflUserService } from 'sfl-shared/services';
import { Subject } from 'rxjs';

describe('EnableSalesMachineDirective', () => {

    let directive: EnableSalesMachineDirective;
    let store: jasmine.SpyObj<Store<AppState>>;
    let userService: jasmine.SpyObj<SflUserService>;
    let router = <any>{};
    let windowRef = <any>{};

    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        router.events = new Subject();
        windowRef.nativeWindow = {Appcues: {identify: jasmine.createSpy()}};

        directive = new EnableSalesMachineDirective(windowRef, store, userService, router);
        directive.testing = true;

    });
    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
