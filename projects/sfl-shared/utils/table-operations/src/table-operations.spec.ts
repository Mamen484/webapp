import { TableOperations } from './table-operations';
import { EMPTY, of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

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
