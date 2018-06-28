import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTagsDialogComponent } from './assign-tags-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { TagsService } from '../../core/services/tags.service';
import { Tag } from '../../core/entities/tag';

describe('AssignTagsDialogComponent', () => {
    let component: AssignTagsDialogComponent;
    let fixture: ComponentFixture<AssignTagsDialogComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<AssignTagsDialogComponent>>;
    let tagsService: jasmine.SpyObj<TagsService>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;


    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select']);
        matDialogRef = jasmine.createSpyObj(['close']);
        tagsService = jasmine.createSpyObj(['assignTags', 'unassignTags']);
        snackBar = jasmine.createSpyObj(['open']);

        TestBed.configureTestingModule({
            declarations: [AssignTagsDialogComponent],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: MAT_DIALOG_DATA, useValue: {data: {orders: []}}},
                {provide: MatDialogRef, useValue: matDialogRef},
                {provide: TagsService, useValue: tagsService},
                {provide: MatSnackBar, useValue: snackBar},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AssignTagsDialogComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should properly extract tags that are assigned to orders from orders.', () => {
        appStore.select.and.returnValue(of([
            {id: 1, name: 'one'},
            {id: 3, name: 'three'},
            {id: 5, name: 'five'},
            {id: 7, name: 'seven'},
            {id: 9, name: 'nine'},
        ]));
        component.data.orders = <any>[
            {_embedded: {tag: [{id: 1}, {id: 5}]}},
            {_embedded: {tag: [{id: 5}, {id: 7}]}},
        ];
        fixture.detectChanges();
        expect(component.assignedTags.length).toEqual(3);
        expect(component.assignedTags[0].name).toEqual('one');
        expect(component.assignedTags[1].name).toEqual('five');
        expect(component.assignedTags[2].name).toEqual('seven');
    });

    it('should NOT send assign/unassign requests if there are no tags to ussing/unassign', () => {
        appStore.select.and.returnValue(of({id: 22}));
        component.save();
        expect(tagsService.assignTags).not.toHaveBeenCalled();
        expect(tagsService.unassignTags).not.toHaveBeenCalled();
    });

    it('should send assign if there are tags to assign', () => {
        appStore.select.and.returnValue(of({id: 22}));
        component.data = <any>{orders: []};
        component.assignTag(<any>{id: 22});
        component.save();
        expect(tagsService.assignTags).toHaveBeenCalled();
        expect(tagsService.unassignTags).not.toHaveBeenCalled();
    });

    it('should send unassign if there are tags to unassign', () => {
        appStore.select.and.returnValue(of({id: 22}));
        const tag = {id: 41};
        component.data = <any>{orders: [{_embedded: {tag: [tag]}}]};
        component.unassignTag(<any>tag);
        component.save();
        expect(tagsService.assignTags).not.toHaveBeenCalled();
        expect(tagsService.unassignTags).toHaveBeenCalled();
    });

    it('should close dialog, passing false into it, when no new tags added/removed', () => {
        appStore.select.and.returnValue(of({id: 22}));
        component.save();
        expect(matDialogRef.close).toHaveBeenCalledWith(false);
    });

    it('should close dialog, passing true into it, when some tags were added/removed', () => {
        appStore.select.and.returnValue(of({id: 22}));
        tagsService.assignTags.and.returnValue(of({}));
        component.data = <any>{orders: []};
        component.assignTag(<any>{id: 22});
        component.save();
        expect(matDialogRef.close).toHaveBeenCalledWith(true);
    });

    it('should close dialog, passing true into it, when some tags were added/removed', () => {
        appStore.select.and.returnValue(of({id: 22}));
        tagsService.assignTags.and.returnValue(throwError({message: 'ndandan'}));
        component.data = <any>{orders: []};
        component.assignTag(<Tag>{id: 22});
        component.save();
        expect(snackBar.open.calls.mostRecent().args[0]).toEqual('ndandan');
    });

    it('should pass to the server newly assigned tags', () => {
        const tags = [
            {id: 1, name: 'one'},
            {id: 3, name: 'three'},
            {id: 5, name: 'five'},
            {id: 7, name: 'seven'},
            {id: 9, name: 'nine'},
        ] as Tag[];
        appStore.select.and.returnValues(of(tags), of({id: 34}));
        component.data.orders = <any>[
            {id: 3, _embedded: {tag: [{id: 1}, {id: 5}]}},
            {id: 4, _embedded: {tag: [{id: 5}, {id: 7}]}},
        ];
        fixture.detectChanges();
        component.assignTag(tags[4]);
        component.assignTag(tags[3]);
        component.save();
        expect(tagsService.assignTags.calls.mostRecent().args[0]).toEqual(34);
        expect(tagsService.assignTags.calls.mostRecent().args[1][0].orderId).toEqual(3);
        expect(tagsService.assignTags.calls.mostRecent().args[1][0].tagId).toEqual(9);
        expect(tagsService.assignTags.calls.mostRecent().args[1][1].orderId).toEqual(4);
        expect(tagsService.assignTags.calls.mostRecent().args[1][1].tagId).toEqual(9);
        expect(tagsService.assignTags.calls.mostRecent().args[1][2].orderId).toEqual(3);
        expect(tagsService.assignTags.calls.mostRecent().args[1][2].tagId).toEqual(7);
        expect(tagsService.assignTags.calls.mostRecent().args[1][3].orderId).toEqual(4);
        expect(tagsService.assignTags.calls.mostRecent().args[1][3].tagId).toEqual(7);
    });

    it('should pass to the server newly unassigned tags', () => {
        const tags = [
            {id: 1, name: 'one'},
            {id: 3, name: 'three'},
            {id: 5, name: 'five'},
            {id: 7, name: 'seven'},
            {id: 9, name: 'nine'},
        ] as Tag[];
        appStore.select.and.returnValues(of(tags), of({id: 34}));
        component.data.orders = <any>[
            {id: 3, _embedded: {tag: [{id: 1}, {id: 5}]}},
            {id: 4, _embedded: {tag: [{id: 5}, {id: 7}]}},
        ];
        fixture.detectChanges();
        component.unassignTag(tags[0]);
        component.unassignTag(tags[2]);
        component.save();
        expect(tagsService.unassignTags.calls.mostRecent().args[0]).toEqual(34);
        expect(tagsService.unassignTags.calls.mostRecent().args[1][0].orderId).toEqual(3);
        expect(tagsService.unassignTags.calls.mostRecent().args[1][0].tagId).toEqual(1);
        expect(tagsService.unassignTags.calls.mostRecent().args[1][1].orderId).toEqual(4);
        expect(tagsService.unassignTags.calls.mostRecent().args[1][1].tagId).toEqual(1);
        expect(tagsService.unassignTags.calls.mostRecent().args[1][2].orderId).toEqual(3);
        expect(tagsService.unassignTags.calls.mostRecent().args[1][2].tagId).toEqual(5);
        expect(tagsService.unassignTags.calls.mostRecent().args[1][3].orderId).toEqual(4);
        expect(tagsService.unassignTags.calls.mostRecent().args[1][3].tagId).toEqual(5);
    });

    it('should NOT pass to the server newly assigned tags, that were later removed', () => {
        const tags = [
            {id: 1, name: 'one'},
            {id: 3, name: 'three'},
            {id: 5, name: 'five'},
            {id: 7, name: 'seven'},
            {id: 9, name: 'nine'},
        ] as Tag[];
        appStore.select.and.returnValues(of(tags), of({id: 34}));
        component.data.orders = <any>[
            {id: 3, _embedded: {tag: [{id: 1}, {id: 5}]}},
            {id: 4, _embedded: {tag: [{id: 5}, {id: 7}]}},
        ];
        fixture.detectChanges();
        component.assignTag(tags[4]);
        component.assignTag(tags[3]);
        component.unassignTag(tags[4]);
        component.unassignTag(tags[3]);
        component.save();
        console.log(tagsService.assignTags.calls.mostRecent());
        expect(tagsService.assignTags).not.toHaveBeenCalled();
        expect(tagsService.unassignTags).toHaveBeenCalled();
    });

    it('should NOT pass to the server newly unassigned tags, that were later assigned', () => {
        const tags = [
            {id: 1, name: 'one'},
            {id: 3, name: 'three'},
            {id: 5, name: 'five'},
            {id: 7, name: 'seven'},
            {id: 9, name: 'nine'},
        ] as Tag[];
        appStore.select.and.returnValues(of(tags), of({id: 34}));
        component.data.orders = <any>[
            {id: 3, _embedded: {tag: [{id: 1}, {id: 5}]}},
            {id: 4, _embedded: {tag: [{id: 5}, {id: 7}]}},
        ];
        fixture.detectChanges();
        component.unassignTag(tags[0]);
        component.unassignTag(tags[2]);
        component.assignTag(tags[0]);
        component.assignTag(tags[2]);
        component.save();
        expect(tagsService.unassignTags).not.toHaveBeenCalled();
        expect(tagsService.assignTags).toHaveBeenCalled();

    });
});
