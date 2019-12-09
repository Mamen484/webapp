import { TestBed } from '@angular/core/testing';

import { SfTimeagoIntlService } from './sf-timeago-intl.service';
import { SflLocaleIdService } from 'sfl-shared/services';

describe('SfTimeagoIntlService', () => {
    let localeIdService: SflLocaleIdService;
    beforeEach(() => {
        localeIdService = <any>{localeId: 'en'};
        TestBed.configureTestingModule({
            providers: [
                {provide: SflLocaleIdService, useValue: localeIdService},
            ],
        })
    });

    it('should be created', () => {
        const service: SfTimeagoIntlService = TestBed.get(SfTimeagoIntlService);
        expect(service).toBeTruthy();
    });
});
