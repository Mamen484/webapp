import { TestBed } from '@angular/core/testing';

import { FieldsResolveGuard } from './fields-resolve.guard';
import { ReferenceService } from './reference.service';
import { EMPTY, of } from 'rxjs';

describe('FieldsResolveGuard', () => {
    let referenceService: jasmine.SpyObj<ReferenceService>;
    let guard: FieldsResolveGuard;

    beforeEach(() => {
        referenceService = jasmine.createSpyObj('ReferenceService spy', ['getFields']);
        TestBed.configureTestingModule({
            providers: [
                FieldsResolveGuard,
                {provide: ReferenceService, useValue: referenceService},
            ]
        });
        guard = TestBed.get(FieldsResolveGuard);
    });

    it('should fetch fields', () => {
        referenceService.getFields.and.returnValue(EMPTY);
        guard.resolve(<any>{}, <any>{}).subscribe();
        expect(referenceService.getFields).toHaveBeenCalled();
    });

    it('should return fields', async () => {
        referenceService.getFields.and.returnValue(of({_embedded: {field: [<any>{someProp: 'someValue'}]}}));
        expect(await guard.resolve(<any>{}, <any>{}).toPromise()).toEqual(<any>[{someProp: 'someValue'}]);
    });
});
