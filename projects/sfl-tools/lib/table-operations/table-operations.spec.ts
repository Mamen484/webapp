import { TableOperations } from './table-operations';
import { EMPTY, of } from 'rxjs';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';

class TableOperationsChild extends TableOperations<any> {
    fetchCollection(params) {
        return undefined;
    }
}

describe('TableOperations', () => {
    let instance: TableOperationsChild;
    let fetchCollection: jasmine.Spy;
    beforeEach(() => {
        instance = new TableOperationsChild();
        fetchCollection = instance.fetchCollection = jasmine.createSpy('fetchCollection spy');
    });

    it('should update data on init', () => {
        fetchCollection.and.returnValue(of({total: 10, dataList: []}));
        instance.ngOnInit();
        expect(fetchCollection).toHaveBeenCalledWith({limit: 15, page: 1, search: ''});
        expect(instance.dataSource.data).toEqual([]);
    });

    it('should reset page when a search string is provided', fakeAsync(() => {
        fetchCollection.and.returnValue(EMPTY);
        instance.ngOnInit();
        instance.currentPage = 6;
        instance.search('some name');
        tick(1000);
        expect(fetchCollection).toHaveBeenCalledWith({limit: 15, page: 1, search: 'some name'});
    }));

    it('should change a page and refresh data on pageChanged()', () => {
        fetchCollection.and.returnValue(of({_embedded: {store: []}}));
        instance.pageChanged(<any>{pageIndex: 1, previousPageIndex: 0});
        expect(fetchCollection).toHaveBeenCalledWith({limit: 15, page: 2, search: ''});
        expect(instance.currentPage).toEqual(1);
    });

    it('should change a pageSize on pageChanged()', () => {
        fetchCollection.and.returnValue(of({_embedded: {store: []}}));
        instance.pageChanged(<any>{pageIndex: 3, previousPageIndex: 3, pageSize: 25});
        expect(fetchCollection).toHaveBeenCalledWith({limit: 25, page: 1, search: ''});
        expect(instance.pageSize).toEqual(25);
    });
});

export function runTableOperationSpecs(getParams: () => {
    fetchCollectionSpy: jasmine.Spy,
    fixture: ComponentFixture<any>,
    collectionResponse: any,
}) {

    describe('table operation child common functions', () => {
        let component: TableOperations<any>;
        let fetchCollectionSpy: jasmine.Spy;
        let fixture: ComponentFixture<any>;
        let collectionResponse: any;

        beforeEach(() => {
            const params = getParams();
            fetchCollectionSpy = params.fetchCollectionSpy;
            fixture = params.fixture;
            collectionResponse = params.collectionResponse;

            component = fixture.componentInstance;
        });

        it('should fetch and show data collection on init', () => {
            fetchCollectionSpy.and.returnValue(of(collectionResponse));
            fixture.detectChanges();
            const {limit, page, search} = fetchCollectionSpy.calls.mostRecent().args[0];
            expect([limit, page, search]).toEqual([15, 1, '']);
            expect(component.dataSource.data).toEqual([]);
        });

        it('should reset page when a search string is provided', fakeAsync(() => {
            fetchCollectionSpy.and.returnValue(EMPTY);
            fixture.detectChanges();
            component.currentPage = 6;
            component.search('some name');
            tick(1000);
            const {limit, page, search} = fetchCollectionSpy.calls.mostRecent().args[0];
            expect([limit, page, search]).toEqual([15, 1, 'some name']);
        }));

        it('should change a page and refresh data on pageChanged()', () => {
            fetchCollectionSpy.and.returnValue(of(<any>collectionResponse));
            component.pageChanged(<any>{pageIndex: 1, previousPageIndex: 0});
            const {limit, page, search} = fetchCollectionSpy.calls.mostRecent().args[0];
            expect([limit, page, search]).toEqual([15, 2, '']);
            expect(component.currentPage).toEqual(1);
        });

        it('should change a pageSize on pageChanged()', () => {
            fetchCollectionSpy.and.returnValue(of(<any>collectionResponse));
            component.pageChanged(<any>{pageIndex: 3, previousPageIndex: 3, pageSize: 25});
            const {limit, page, search} = fetchCollectionSpy.calls.mostRecent().args[0];
            expect([limit, page, search]).toEqual([25, 1, '']);
            expect(component.pageSize).toEqual(25);
        });
    });
}
