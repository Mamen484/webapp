import { TestBed, inject } from '@angular/core/testing';

import { PasswordRecoveryService } from './password-recovery.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('PasswordRecoveryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PasswordRecoveryService],
            imports: [HttpClientTestingModule]
        });
    });

    it('should be created', inject([PasswordRecoveryService], (service: PasswordRecoveryService) => {
        expect(service).toBeTruthy();
    }));

    it('should call legacy app to send a recovery email', inject([PasswordRecoveryService, HttpTestingController], (service: PasswordRecoveryService, controller: HttpTestingController) => {
        service.sendRecoveryEmail('someName').subscribe();
        let request = controller.expectOne(environment.APP_URL + '/lib/scripts/password.php').request;
        expect(request.body).toEqual('name=someName');
        expect(request.headers.get('Content-Type')).toEqual('application/x-www-form-urlencoded');
        controller.verify();
    }));

    it('should call legacy app to recover a password', inject([PasswordRecoveryService, HttpTestingController], (service: PasswordRecoveryService, controller: HttpTestingController) => {
        service.resetPassword('someToken', 'someName', 'somePassword').subscribe();
        let request = controller.expectOne(environment.APP_URL + '/lib/scripts/resetpassword.php').request;
        expect(request.body).toEqual('name=someName&token=someToken&password=somePassword');
        expect(request.headers.get('Content-Type')).toEqual('application/x-www-form-urlencoded');
        controller.verify();
    }));

});
