import { ListOperations } from './list-operations';
import { EMPTY, of, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigurationState } from '../configuration-state';
import { Directive } from "@angular/core";


describe('ListOperations', () => {
    let listOperationsChild: ListOperations<any>;
    let fetchSpy: jasmine.Spy;
    let routeData: Subject<any>;
    beforeEach(() => {
        fetchSpy = jasmine.createSpy();
        routeData = new Subject<any>();
        @Directive()
class ListOperationsChild extends ListOperations<any> {
            matDialog = jasmine.createSpyObj(['open']);
            route = <any>{data: routeData};
            chooseListItem = jasmine.createSpy();
            fetchCollection = fetchSpy;

            listenCategoryMappingChanged = jasmine.createSpy();
        }

        listOperationsChild = new ListOperationsChild();

    });
    it('should create an instance', () => {
        expect(listOperationsChild).toBeTruthy();
    });

    it('should select the next category when chooseNextClientCategory() called', () => {
        listOperationsChild.dataSource = new MatTableDataSource(<any>[{id: 1}, {id: 2}]);
        listOperationsChild.chosenListItem = listOperationsChild.dataSource.data[0];
        listOperationsChild.chooseNextListItem();
        expect(listOperationsChild.chooseListItem).toHaveBeenCalledWith({id: 2});
    });

    it('should load next page when chooseNextClientCategory() called and the last category selected', () => {
        const spy = spyOn(listOperationsChild, 'pageChanged');
        listOperationsChild.currentPage = 0;
        listOperationsChild.dataSource = new MatTableDataSource(<any>[{id: 1}, {id: 2}]);
        listOperationsChild.resultsLength = 100;
        listOperationsChild.chosenListItem = listOperationsChild.dataSource.data[1];
        listOperationsChild.chooseNextListItem();
        expect(spy).toHaveBeenCalledWith({pageIndex: 1, previousPageIndex: 0, pageSize: listOperationsChild.pageSize, length: 100});
    });


    it('should scroll to the page top when chooseNextClientCategory() called and the last category selected', () => {
        fetchSpy.and.returnValue(EMPTY);
        listOperationsChild.currentPage = 0;
        listOperationsChild.dataSource = new MatTableDataSource(<any>[{id: 1}, {id: 2}]);
        listOperationsChild.resultsLength = 100;
        listOperationsChild.chosenListItem = listOperationsChild.dataSource.data[1];
        listOperationsChild.listContainer = jasmine.createSpyObj(['scrollTo']);
        listOperationsChild.chooseNextListItem();
        expect(listOperationsChild.listContainer.scrollTo).toHaveBeenCalledWith({top: 0});
    });

    it('should NOT load next page when chooseNextClientCategory() called and the last category on the last page selected', () => {
        const spy = spyOn(listOperationsChild, 'pageChanged');
        listOperationsChild.dataSource = new MatTableDataSource([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (<any>{
            id: item,
            channelCategory: {}
        })));
        listOperationsChild.currentPage = 4; // last page
        listOperationsChild.pageSize = 10;
        listOperationsChild.resultsLength = 50;
        listOperationsChild.chosenListItem = listOperationsChild.dataSource.data[9];
        listOperationsChild.chooseNextListItem();
        expect(spy).not.toHaveBeenCalled();
    });

    it('should reset filter on cancelFilter() call', () => {
        fetchSpy.and.returnValue(EMPTY);
        listOperationsChild.configurationStateFilter = ConfigurationState.Configured;
        listOperationsChild.cancelFilter();
        expect(listOperationsChild.configurationStateFilter).toBe(ConfigurationState.NotSpecified);
    });

    it('should start listening on category change on init', () => {
        fetchSpy.and.returnValue(EMPTY);
        listOperationsChild.ngOnInit();
        routeData.next({data: {feed: {id: 123}}});
        expect(listOperationsChild.listenCategoryMappingChanged).toHaveBeenCalled();
    });

    it('should fetch data on init', () => {
        fetchSpy.and.returnValue(EMPTY);
        listOperationsChild.ngOnInit();
        routeData.next({data: {feed: {id: 123}}});
        expect(fetchSpy).toHaveBeenCalled();
    });

    it('should emit updated event when data loads', () => {
        fetchSpy.and.returnValue(of({}));
        const spy = spyOn(listOperationsChild.updated, 'emit');
        listOperationsChild.ngOnInit();
        routeData.next({data: {feed: {id: 123}}});
        expect(spy).toHaveBeenCalled();
    });

    it('should reassign the selected list item', () => {
        fetchSpy.and.returnValue(of({dataList: [{id: 1}, {id: 2, someProp: 1}]}));
        const spy = spyOn(listOperationsChild.updated, 'emit');
        listOperationsChild.chosenListItem = {id: 2};
        listOperationsChild.updateData();
        expect(listOperationsChild.chooseListItem).toHaveBeenCalledWith(listOperationsChild.dataSource.data[1]);
    });

    it('should assign the first list item if nothing was previously selected', () => {
        fetchSpy.and.returnValue(of({dataList: [{id: 1}, {id: 2, someProp: 1}]}));
        const spy = spyOn(listOperationsChild.updated, 'emit');
        listOperationsChild.updateData();
        expect(listOperationsChild.chooseListItem).toHaveBeenCalledWith(listOperationsChild.dataSource.data[0]);
    });
});
