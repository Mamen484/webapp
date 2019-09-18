import { TestBed } from '@angular/core/testing';

import { FeedService } from './feed.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { EMPTY, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryState } from '../../channel-setup/category-state';

describe('FeedService', () => {
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let service: FeedService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        appStore = jasmine.createSpyObj('Store', ['select']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: Store, useValue: appStore},
            ]
        });

        service = TestBed.get(FeedService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        appStore.select.and.returnValue(EMPTY);
        expect(service).toBeTruthy();
    });

    it('should call a proper endpoint on fetchCategoryCollection call', () => {
        service.fetchCategoryCollection(11, {name: 'some_name'}).subscribe();

        let req = httpMock.expectOne(`${environment.API_URL}/feed/11/category?name=some_name`);
        expect(req.request.method).toBe('GET');
    });

    it('should include page, limit and mapping params to a fetchCategoryCollection call', () => {
        service.fetchCategoryCollection(11, {limit: '10', page: '3', state: CategoryState.Configured}).subscribe();

        let req = httpMock.expectOne(`${environment.API_URL}/feed/11/category?page=3&limit=10&state=${CategoryState.Configured}`);
        expect(req.request.method).toBe('GET');
    });

    it('should call a proper endpoint on fetchFeedCollection call', () => {
        appStore.select.and.returnValue(of({id: 14, country: 'aa'}));
        service.fetchFeedCollection(41).subscribe();

        let req = httpMock.expectOne(`${environment.API_URL}/feed?catalogId=14&channelId=41&country=aa`);
        expect(req.request.method).toBe('GET');
    });

    it('should call a cached feed collection when requested a second time', () => {
        appStore.select.and.returnValue(of({id: 14, country: 'aa'}));
        service.fetchFeedCollection(41).subscribe();
        service.fetchFeedCollection(41).subscribe();

        let reqs = httpMock.match(`${environment.API_URL}/feed?catalogId=14&channelId=41&country=aa`);
        expect(reqs.length).toBe(1);

    });

    it('should force a call for feed collection when requested a second time with `forceFetch` param', () => {
        appStore.select.and.returnValue(of({id: 14, country: 'aa'}));
        let call1 = service.fetchFeedCollection(41).subscribe();
        let call2 = service.fetchFeedCollection(41, true).subscribe();
        expect(call1).not.toBe(call2);

        let reqs = httpMock.match(`${environment.API_URL}/feed?catalogId=14&channelId=41&country=aa`);
        expect(reqs.length).toBe(2);
    });

    it('should make different calls for feed collections with different channelId', () => {
        appStore.select.and.returnValue(of({id: 14, country: 'aa'}));
        let call1 = service.fetchFeedCollection(41).subscribe();
        let call2 = service.fetchFeedCollection(42).subscribe();
        expect(call1).not.toBe(call2);

        httpMock.expectOne(`${environment.API_URL}/feed?catalogId=14&channelId=41&country=aa`);
        httpMock.expectOne(`${environment.API_URL}/feed?catalogId=14&channelId=42&country=aa`);
    });

    it('should call a proper endpoint on mapFeedCategory call', () => {
        service.mapFeedCategory(11, 12, 13).subscribe();

        let req = httpMock.expectOne(`${environment.API_URL}/feed/11/mapping/category/12`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body.mapping.channelCategoryId).toBe(13);
    });

    it('should call a proper endpoint on fetchMappingCollection call', () => {
        appStore.select.and.returnValue(of({id: 58}));
        service.fetchMappingCollection().subscribe();

        let req = httpMock.expectOne(`${environment.API_URL}/catalog/58/mapping`);
        expect(req.request.method).toBe('GET');
    });

    it('should call a cached mapping collection when requested a second time', () => {
        appStore.select.and.returnValue(of({id: 58}));
        service.fetchMappingCollection().subscribe();
        service.fetchMappingCollection().subscribe();

        let reqs = httpMock.match(`${environment.API_URL}/catalog/58/mapping`);
        expect(reqs.length).toBe(1);

    });

    it('should make different calls for mapping collections with different catalogId', () => {
        appStore.select.and.returnValue(of({id: 56}));
        let call1 = service.fetchMappingCollection().subscribe();
        appStore.select.and.returnValue(of({id: 57}));
        let call2 = service.fetchMappingCollection().subscribe();
        expect(call1).not.toBe(call2);

        httpMock.expectOne(`${environment.API_URL}/catalog/56/mapping`);
        httpMock.expectOne(`${environment.API_URL}/catalog/57/mapping`);
    });


});
