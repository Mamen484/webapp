import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListComponent } from './store-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BillingStoreService } from './billing-store.service';
import { EMPTY, of } from 'rxjs';
import { StoreDialogComponent } from './store-dialog/store-dialog.component';
import { StoreBlockDialogComponent } from './store-block-dialog/store-block-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { runTableOperationSpecs } from '../../../../../sfl-tools/src/lib/table-operations/table-operations.spec';

describe('StoreListComponent', () => {
    let component: StoreListComponent;
    let fixture: ComponentFixture<StoreListComponent>;
    let billingService: jasmine.SpyObj<BillingStoreService>;
    let matDialog: jasmine.SpyObj<MatDialog>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;


    beforeEach(async(() => {
        billingService = jasmine.createSpyObj('BillingService', ['fetchStoreCollection', 'create', 'update']);
        matDialog = jasmine.createSpyObj('MatDialog', ['open']);
        snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
        TestBed.configureTestingModule({
            declarations: [StoreListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatTableModule],
            providers: [
                {provide: BillingStoreService, useValue: billingService},
                {provide: MatDialog, useValue: matDialog},
                {provide: MatSnackBar, useValue: snackBar},
                {provide: ActivatedRoute, useValue: {queryParams: EMPTY}},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    runTableOperationSpecs(() => ({
        fetchCollectionSpy: billingService.fetchStoreCollection,
        fixture,
        collectionResponse: {_embedded: {store: []}}
    }));

    it('should open a StoreDialogComponent on openCreateStoreDialog()', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.openCreateStoreDialog();
        const openDialogArgs = matDialog.open.calls.mostRecent().args;
        expect(openDialogArgs[0]).toBe(StoreDialogComponent);
        expect((<any>openDialogArgs[1].data).nameEditable).toBe(true);
        expect((<any>openDialogArgs[1]).data.store).toBeNull();
    });

    it('should refresh stores list when create store is successful', () => {
        billingService.fetchStoreCollection.and.returnValue(of(<any>{_embedded: {store: []}}));
        matDialog.open.and.returnValue(<any>{afterClosed: () => of({})});
        component.openCreateStoreDialog();
        expect(billingService.fetchStoreCollection).toHaveBeenCalled();
    });

    it('should open a StoreDialogComponent on openEditStoreDialog()', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.openEditStoreDialog(<any>{someprop: 'somevalue'});
        const openDialogArgs = matDialog.open.calls.mostRecent().args;
        expect(openDialogArgs[0]).toBe(StoreDialogComponent);
        expect((<any>openDialogArgs[1].data).nameEditable).toBe(false);
        expect((<any>openDialogArgs[1].data).store).toEqual({someprop: 'somevalue'});
    });

    it('should refresh stores list when update store is successful', () => {
        billingService.fetchStoreCollection.and.returnValue(of(<any>{_embedded: {store: []}}));
        matDialog.open.and.returnValue(<any>{afterClosed: () => of({})});
        component.openEditStoreDialog(<any>{});
        expect(billingService.fetchStoreCollection).toHaveBeenCalled();
    });

    it('should show a snackbar with successful message when store saved', () => {
        billingService.fetchStoreCollection.and.returnValue(of(<any>{_embedded: {store: []}}));
        matDialog.open.and.returnValue(<any>{afterClosed: () => of({})});
        component.openEditStoreDialog(<any>{});
        expect(snackBar.open).toHaveBeenCalled();
        expect(snackBar.open.calls.mostRecent().args[0]).toContain('has been saved');
    });

    it('should open a StoreBlockDialogComponent on blockStore()', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.blockStore({});
        expect(matDialog.open).toHaveBeenCalledWith(StoreBlockDialogComponent);
    });

    it('should send an update store request when true comes from a store block dialog', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => of(true)});
        billingService.update.and.returnValue(EMPTY);
        component.blockStore(<any>{id: 23});
        expect(billingService.update).toHaveBeenCalledWith({id: 23, isActive: false});
    });

    it('should NOT send an update store request when false comes from a store block dialog', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => of(false)});
        billingService.update.and.returnValue(EMPTY);
        component.blockStore(<any>{id: 23});
        expect(billingService.update).not.toHaveBeenCalled();
    });

    it('should refresh stores list when update store is successful', () => {
        billingService.fetchStoreCollection.and.returnValue(of(<any>{_embedded: {store: []}}));
        matDialog.open.and.returnValue(<any>{afterClosed: () => of({})});
        billingService.update.and.returnValue(of({}));
        component.blockStore(<any>{});
        expect(billingService.fetchStoreCollection).toHaveBeenCalled();
    });

    it('should send an update store request on activateStore() call', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => of(false)});
        billingService.update.and.returnValue(EMPTY);
        component.activateStore(<any>{id: 23});
        expect(billingService.update).toHaveBeenCalledWith({id: 23, isActive: true});
    });

    it('should refresh stores list when update store is successful', () => {
        billingService.fetchStoreCollection.and.returnValue(of(<any>{_embedded: {store: []}}));
        matDialog.open.and.returnValue(<any>{afterClosed: () => of({})});
        billingService.update.and.returnValue(of({}));
        component.activateStore(<any>{});
        expect(billingService.fetchStoreCollection).toHaveBeenCalled();
    });
});
