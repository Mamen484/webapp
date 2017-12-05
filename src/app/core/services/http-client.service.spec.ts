import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material';
import { ServerErrorComponent } from '../../snackbars/server-error/server-error.component';

describe('HttpClientService', () => {
    let snackBar;
    let service;
    let httpMock;
    beforeEach(() => {
        snackBar = jasmine.createSpyObj('SnackBar', ['openFromComponent']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpClientService,
                {provide: MatSnackBar, useValue: snackBar},
            ]
        });
        service = TestBed.get(HttpClientService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('Should handle a successful response.', () => {
        let callbackSpy = jasmine.createSpy('subscription callback');
        service.get('/smth').subscribe(callbackSpy);
        let req = httpMock.expectOne('/smth');
        req.flush('data');
        expect(callbackSpy).toHaveBeenCalledTimes(1);
        expect(callbackSpy).toHaveBeenCalledWith('data');
    });

    it('Should retry to load the data when an error occurres.', fakeAsync(() => {
        service.retryInterval = 0;
        let callbackSpy = jasmine.createSpy('subscription callback');
        service.get('/smth').subscribe(callbackSpy);
        let req = httpMock.expectOne('/smth');
        req.flush('data', {status: 503, statusText: 'Service Unavailable'});
        tick();
        req = httpMock.expectOne('/smth');
        req.flush('some data');
        expect(callbackSpy).toHaveBeenCalledTimes(1);
        expect(callbackSpy).toHaveBeenCalledWith('some data');
    }));

    it('Should display a snackbar after 3 failed attemps to load the data.', fakeAsync(() => {
        service.retryInterval = 0;
        let callbackSpy = jasmine.createSpy('subscription callback');
        let callbackErrorSpy = jasmine.createSpy('subscription error callback');
        service.get('/smth').subscribe(callbackSpy, callbackErrorSpy);
        let req = httpMock.expectOne('/smth');
        req.flush('data', {status: 503, statusText: 'Service Unavailable'});
        tick();
        req = httpMock.expectOne('/smth');
        req.flush('data', {status: 503, statusText: 'Service Unavailable'});
        tick();
        req = httpMock.expectOne('/smth');
        req.flush('data', {status: 503, statusText: 'Service Unavailable'});
        tick();
        httpMock.expectNone('/smth');
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(ServerErrorComponent);
        expect(callbackSpy).not.toHaveBeenCalled();
        expect(callbackErrorSpy).toHaveBeenCalled();


    }));


});
