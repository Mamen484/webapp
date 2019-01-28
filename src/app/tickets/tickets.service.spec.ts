import { TestBed } from '@angular/core/testing';

import { TicketsService } from './tickets.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { EMPTY, of } from 'rxjs';
import { environment } from '../../environments/environment';

describe('TicketsService', () => {
    let service: TicketsService;
    let httpMock: HttpTestingController;

    let appStore: jasmine.SpyObj<Store<AppState>>;
    beforeEach(() => {

        appStore = jasmine.createSpyObj('Store spy', ['select']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: Store, useValue: appStore},
            ],
        });

        service = TestBed.get(TicketsService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch a valid endpoint on fetchTicketCollection() call', () => {
        appStore.select.and.returnValue(of({id: 43}));
        service.fetchTicketCollection().subscribe();
        console.log(httpMock);
        const req = httpMock.expectOne(environment.API_URL + '/store/43/ticket');
        expect(req.request.method).toBe('GET');
    });

    it('should fetch a valid endpoint on fetchTicket() call', () => {
        appStore.select.and.returnValue(of({id: 45}));
        service.fetchTicket(33).subscribe();
        const req = httpMock.expectOne(environment.API_URL + '/store/45/ticket/33');
        expect(req.request.method).toBe('GET');
    });
});
