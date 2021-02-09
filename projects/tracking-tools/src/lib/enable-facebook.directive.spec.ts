import { EnableFacebookDirective } from './enable-facebook.directive';
import { SflUserService } from 'sfl-shared/services';

describe('EnableFacebookDirective', () => {

    let userService: jasmine.SpyObj<SflUserService>;
    let directive: EnableFacebookDirective;

    beforeEach(() => {
        userService = jasmine.createSpyObj(['fetchAggregatedInfo']);
        directive = new EnableFacebookDirective(
            userService,
            <any>{nativeWindow: {}},
            <any>{},
        );
    });
    it('should create an instance', () => {

        expect(directive).toBeTruthy();
    });
});
