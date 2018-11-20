import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ErrorInterceptor } from './error-interceptor';
import { Router } from '@angular/router';


describe('ErrorInterceptor', () => {

    let http: HttpClient;
    let httpMock: HttpTestingController;
    let router: jasmine.SpyObj<Router>;

    beforeEach(() => {
        router = jasmine.createSpyObj('Router', ['isActive', 'navigate']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
                {provide: Router, useValue: router},
            ]
        });
    });

    beforeEach(() => {
        http = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should redirect to /login when the user is not authorized', () => {
        router.isActive.and.returnValue(false);
        http.get('/auth').subscribe();

        httpMock.expectOne('/auth')
            .flush({}, {status: 401, statusText: 'some error'});

        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should NOT redirect to /login when the user is already on login page', () => {
        router.isActive.and.returnValue(true);
        http.get('/auth').subscribe();

        httpMock.expectOne('/auth')
            .flush({}, {status: 401, statusText: 'some error'});

        expect(router.navigate).not.toHaveBeenCalled();
    });


    it('should NOT redirect to /login when the error is different from 401', () => {
        router.isActive.and.returnValue(false);
        http.get('/auth').subscribe();

        httpMock.expectOne('/auth')
            .flush({}, {status: 402, statusText: 'some error'});

        expect(router.navigate).not.toHaveBeenCalled();
    });


});

