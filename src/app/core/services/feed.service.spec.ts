import { TestBed } from '@angular/core/testing';

import { FeedService } from './feed.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { EMPTY } from 'rxjs';

describe('FeedService', () => {
    let appStore: jasmine.SpyObj<Store<AppState>>;
    beforeEach(() => {
        appStore = jasmine.createSpyObj('Store', ['select']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: Store, useValue: appStore},
            ]
        });
    });

    it('should be created', () => {
        appStore.select.and.returnValue(EMPTY);
        const service: FeedService = TestBed.get(FeedService);
        expect(service).toBeTruthy();
    });
});
