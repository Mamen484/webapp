import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsManagementComponent } from './tags-management.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TagsService } from '../../../core/services/tags.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EMPTY, of, throwError } from 'rxjs';
import { NewTagDialogComponent } from '../../new-tag-dialog/new-tag-dialog.component';

describe('TagsManagementComponent', () => {
    let component: TagsManagementComponent;
    let fixture: ComponentFixture<TagsManagementComponent>;

    let matDialog: jasmine.SpyObj<MatDialog>;
    let tagsService: jasmine.SpyObj<TagsService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;

    beforeEach(async(() => {

        matDialog = jasmine.createSpyObj(['open']);
        tagsService = jasmine.createSpyObj(['create', 'fetchAll', 'remove', 'update']);
        appStore = jasmine.createSpyObj(['select', 'dispatch']);
        snackBar = jasmine.createSpyObj(['open']);
        TestBed.configureTestingModule({
            declarations: [TagsManagementComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: TagsService, useValue: tagsService},
                {provide: Store, useValue: appStore},
                {provide: MatSnackBar, useValue: snackBar},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TagsManagementComponent);
        component = fixture.componentInstance;
    });

    it('should assign tags on init', () => {
        appStore.select.and.returnValue(of([{name: 'some name'}]));
        expect(component.tags).not.toBeDefined();
        fixture.detectChanges();
        expect(component.tags.length).toEqual(1);
        expect(component.tags[0].name).toEqual('some name');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open a new tag dialog when createNewTag() is called', () => {
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.createNewTag();
        expect(matDialog.open).toHaveBeenCalledTimes(1);
        expect(matDialog.open).toHaveBeenCalledWith(NewTagDialogComponent);
    });

    it('should open a new tag dialog when updateTag() is called', () => {
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.updateTag(2, 'label');
        expect(matDialog.open.calls.mostRecent().args[0]).toEqual(NewTagDialogComponent);
        expect(matDialog.open.calls.mostRecent().args[1].data.name).toEqual('label');
    });

    it('should not make a server request when no data returned from dialog', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(undefined)});
        component.createNewTag();
        component.updateTag(2, 'label');
        expect(appStore.select).not.toHaveBeenCalled();
        expect(tagsService.create).not.toHaveBeenCalled();
    });

    it('should call a create request when the tagName is returned from dialog', () => {
        matDialog.open.and.returnValue({afterClosed: () => of('important')});
        appStore.select.and.returnValue(of({id: 29}));
        component.createNewTag();
        expect(tagsService.create).toHaveBeenCalledTimes(1);
        expect(tagsService.create.calls.mostRecent().args[0]).toEqual(29);
        expect(tagsService.create.calls.mostRecent().args[1].name).toEqual('important');
        expect(tagsService.create.calls.mostRecent().args[1].color).toEqual('#1976d2');
    });

    it('should call an update request when the tagName is returned from dialog', () => {
        matDialog.open.and.returnValue({afterClosed: () => of('important')});
        appStore.select.and.returnValue(of({id: 29}));
        component.updateTag(14, 'name1');
        expect(tagsService.update).toHaveBeenCalledTimes(1);
        expect(tagsService.update.calls.mostRecent().args[0]).toEqual(29);
        expect(tagsService.update.calls.mostRecent().args[1]).toEqual(14);
        expect(tagsService.update.calls.mostRecent().args[2].name).toEqual('important');
        expect(tagsService.update.calls.mostRecent().args[2].color).toEqual('#1976d2');
    });

    it('should call a remove request when removeTag() called', () => {
        appStore.select.and.returnValue(of({id: 29}));
        component.removeTag(16);
        expect(tagsService.remove).toHaveBeenCalledTimes(1);
        expect(tagsService.remove.calls.mostRecent().args[0]).toEqual(29);
        expect(tagsService.remove.calls.mostRecent().args[1]).toEqual(16);
    });

    it('should call a fetchAll request to update the tags list when the tag create is successful', () => {
        matDialog.open.and.returnValue({afterClosed: () => of('important')});
        appStore.select.and.returnValue(of({id: 29}));
        tagsService.create.and.returnValue(of({}));
        tagsService.fetchAll.and.returnValue(EMPTY);
        component.createNewTag();
        expect(tagsService.fetchAll).toHaveBeenCalledTimes(1);
        expect(tagsService.fetchAll).toHaveBeenCalledWith(29);
    });

    it('should call a fetchAll request to update the tags list when the tag update is successful', () => {
        matDialog.open.and.returnValue({afterClosed: () => of('important')});
        appStore.select.and.returnValue(of({id: 29}));
        tagsService.update.and.returnValue(of({}));
        tagsService.fetchAll.and.returnValue(EMPTY);
        component.updateTag(2, 'name');
        expect(tagsService.fetchAll).toHaveBeenCalledTimes(1);
        expect(tagsService.fetchAll).toHaveBeenCalledWith(29);
    });

    it('should call a fetchAll request to update the tags list when the tag remove is successful', () => {
        matDialog.open.and.returnValue({afterClosed: () => of('important')});
        appStore.select.and.returnValue(of({id: 29}));
        tagsService.remove.and.returnValue(of({}));
        tagsService.fetchAll.and.returnValue(EMPTY);
        component.removeTag(2);
        expect(tagsService.fetchAll).toHaveBeenCalledTimes(1);
        expect(tagsService.fetchAll).toHaveBeenCalledWith(29);
    });

    it('should dispatch updated tags info when the new tags fetched', () => {
        matDialog.open.and.returnValue({afterClosed: () => of('important')});
        appStore.select.and.returnValues(of({id: 29}), of({id: 29}));
        tagsService.create.and.returnValue(of({}));
        tagsService.fetchAll.and.returnValue(of({_embedded: {tag: ['some', 'data']}}));
        component.createNewTag();
        expect(appStore.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should show a snack bar if an error returned on tag creation', () => {
        matDialog.open.and.returnValue({afterClosed: () => of('important')});
        appStore.select.and.returnValue(of({id: 29}));
        tagsService.create.and.returnValue(throwError({message: 'err'}));
        component.createNewTag();
        expect(snackBar.open).toHaveBeenCalledTimes(1);
        expect(snackBar.open.calls.mostRecent().args[0]).toEqual('err');
    });

    it('should show a snack bar if an error returned on tag update', () => {
        matDialog.open.and.returnValue({afterClosed: () => of('important')});
        appStore.select.and.returnValue(of({id: 29}));
        tagsService.update.and.returnValue(throwError({message: 'err'}));
        component.updateTag(10, 'name');
        expect(snackBar.open).toHaveBeenCalledTimes(1);
        expect(snackBar.open.calls.mostRecent().args[0]).toEqual('err');
    });

    it('should show a snack bar if an error returned on tag remove', () => {
        matDialog.open.and.returnValue({afterClosed: () => of('important')});
        appStore.select.and.returnValue(of({id: 29}));
        tagsService.remove.and.returnValue(throwError({message: 'err'}));
        component.removeTag(10);
        expect(snackBar.open).toHaveBeenCalledTimes(1);
        expect(snackBar.open.calls.mostRecent().args[0]).toEqual('err');
    });
});
