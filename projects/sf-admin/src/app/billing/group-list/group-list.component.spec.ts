import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListComponent } from './group-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BillingGroupService } from './billing-group.service';
import { MatDialog, MatSnackBar, MatTableModule } from '@angular/material';
import { EMPTY, of } from 'rxjs';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';

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

    it('should fetch and show billing groups on init', () => {
        billingGroupService.fetchGroupCollection.and.returnValue(of({_embedded: {group: []}}));
        fixture.detectChanges();
        expect(billingGroupService.fetchGroupCollection).toHaveBeenCalledWith({limit: 15, page: 1, search: ''});
        expect(component.dataSource.data).toEqual([]);
    });


    it('should open a GroupDialogComponent on openCreateGroupDialog()', () => {
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.openCreateGroupDialog();
        const openDialogArgs = matDialog.open.calls.mostRecent().args;
        expect(openDialogArgs[0]).toBe(GroupDialogComponent);
        expect(openDialogArgs[1].data.group).toEqual({name: '', stores: []})
    });

    it('should refresh groups list when create group is successful', () => {
        billingGroupService.fetchGroupCollection.and.returnValue(of({_embedded: {group: []}}));
        matDialog.open.and.returnValue({afterClosed: () => of({})});
        component.openCreateGroupDialog();
        expect(billingGroupService.fetchGroupCollection).toHaveBeenCalled();
    });

    it('should open a GroupDialogComponent on openEditGroupDialog()', () => {
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.openEditGroupDialog(<any>{id: 19, name: 'some group', _embedded: {stores: []}});
        const openDialogArgs = matDialog.open.calls.mostRecent().args;
        expect(openDialogArgs[0]).toBe(GroupDialogComponent);
        expect(openDialogArgs[1].data.group).toEqual({id: 19, name: 'some group', stores: []});
    });

    it('should refresh groups list when update group is successful', () => {
        billingGroupService.fetchGroupCollection.and.returnValue(of({_embedded: {group: []}}));
        matDialog.open.and.returnValue({afterClosed: () => of({})});
        component.openEditGroupDialog(<any>{});
        expect(billingGroupService.fetchGroupCollection).toHaveBeenCalled();
    });

    it('should show a snackbar with successful message when group saved', () => {
        billingGroupService.fetchGroupCollection.and.returnValue(of({_embedded: {group: []}}));
        matDialog.open.and.returnValue({afterClosed: () => of({})});
        component.openEditGroupDialog(<any>{});
        expect(snackBar.open).toHaveBeenCalled();
        expect(snackBar.open.calls.mostRecent().args[0]).toContain('has been saved');
    });

});