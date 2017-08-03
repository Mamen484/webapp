import { TestBed, inject } from '@angular/core/testing';

import { StoreService } from './store.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('StoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StoreService,
                {provide: Http, useValue: {get: () => Observable.of({})}}
            ]
        });
    });

    it('should be created', inject([StoreService], (service: StoreService) => {
        expect(service).toBeTruthy();
    }));
});
