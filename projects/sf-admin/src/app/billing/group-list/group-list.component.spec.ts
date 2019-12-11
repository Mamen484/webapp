import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListComponent } from './group-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BillingGroupService } from './billing-group.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { EMPTY, of } from 'rxjs';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import {runTableOperationSpecs} from '../../../../../sfl-tools/src/lib/table-operations/src/table-operations.spec';

describe('GroupListComponent', () => {
    let component: GroupListComponent;
    let fixture: ComponentFixture<GroupListComponent>;

    let billingGroupService: jasmine.SpyObj<BillingGroupService>;
    let matDialog: jasmine.SpyObj<MatDialog>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;

    beforeEach(async(() => {
        matDialog = jasmine.createSpyObj('MatDialog', ['open']);
        snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
        billingGroupService = jasmine.createSpyObj('BillingGroupService spy', ['fetchGroupCollection']);
        TestBed.configureTestingModule({
            imports: [MatTableModule],
            declarations: [GroupListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: BillingGroupService, useValue: billingGroupService},
                {provide: MatDialog, useValue: matDialog},
                {provide: MatSnackBar, useValue: snackBar},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    runTableOperationSpecs(() => ({
        fetchCollectionSpy: billingGroupService.fetchGroupCollection,
        fixture,
        collectionResponse: {_embedded: {group: []}}
    }));

    it('should open a GroupDialogComponent on openCreateGroupDialog()', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.openCreateGroupDialog();
        const openDialogArgs = matDialog.open.calls.mostRecent().args;
        expect(openDialogArgs[0]).toBe(GroupDialogComponent);
        expect((<any>openDialogArgs[1].data).group).toEqual({name: '', stores: []})
    });

    it('should refresh groups list when create group is successful', () => {
        billingGroupService.fetchGroupCollection.and.returnValue(of(<any>{_embedded: {group: []}}));
        matDialog.open.and.returnValue(<any>{afterClosed: () => of({})});
        component.openCreateGroupDialog();
        expect(billingGroupService.fetchGroupCollection).toHaveBeenCalled();
    });

    it('should open a GroupDialogComponent on openEditGroupDialog()', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.openEditGroupDialog(<any>{id: 19, name: 'some group', _embedded: {stores: []}});
        const openDialogArgs = matDialog.open.calls.mostRecent().args;
        expect(openDialogArgs[0]).toBe(GroupDialogComponent);
        expect((<any>openDialogArgs[1].data).group).toEqual({id: 19, name: 'some group', stores: []});
    });

    it('should refresh groups list when update group is successful', () => {
        billingGroupService.fetchGroupCollection.and.returnValue(of(<any>{_embedded: {group: []}}));
        matDialog.open.and.returnValue(<any>{afterClosed: () => of({})});
        component.openEditGroupDialog(<any>{});
        expect(billingGroupService.fetchGroupCollection).toHaveBeenCalled();
    });

    it('should show a snackbar with successful message when group saved', () => {
        billingGroupService.fetchGroupCollection.and.returnValue(of(<any>{_embedded: {group: []}}));
        matDialog.open.and.returnValue(<any>{afterClosed: () => of({})});
        component.openEditGroupDialog(<any>{});
        expect(snackBar.open).toHaveBeenCalled();
        expect(snackBar.open.calls.mostRecent().args[0]).toContain('has been saved');
    });

});
