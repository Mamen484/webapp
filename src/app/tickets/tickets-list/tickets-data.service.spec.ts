import { TestBed } from '@angular/core/testing';

import { TicketsDataService } from './tickets-data.service';

describe('TicketsDataService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: TicketsDataService = TestBed.get(TicketsDataService);
        expect(service).toBeTruthy();
    });
});
