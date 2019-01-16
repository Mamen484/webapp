import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StoreListComponent } from './store-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableModule } from '@angular/material';
import { BillingStoreService } from './billing-store.service';
import { EMPTY, of } from 'rxjs';
import { StoreDialogComponent } from './store-dialog/store-dialog.component';
import { StoreBlockDialogComponent } from './store-block-dialog/store-block-dialog.component';

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

    it('should fetch and show billing stores on init', () => {
        billingService.fetchStoreCollection.and.returnValue(of({_embedded: {store: []}}));
        fixture.detectChanges();
        expect(billingService.fetchStoreCollection).toHaveBeenCalledWith({limit: 15, page: 1, search: ''});
        expect(component.dataSource).toEqual([]);
    });

    it('should open a StoreDialogComponent on openCreateStoreDialog()', () => {
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.openCreateStoreDialog();
        const openDialogArgs = matDialog.open.calls.mostRecent().args;
        expect(openDialogArgs[0]).toBe(StoreDialogComponent);
        expect(openDialogArgs[1].data.nameEditable).toBe(true);
        expect(openDialogArgs[1].data.store).toBeNull();
    });

    it('should refresh stores list when create store is successful', () => {
        billingService.fetchStoreCollection.and.returnValue(of({_embedded: {store: []}}));
        matDialog.open.and.returnValue({afterClosed: () => of({})});
        component.openCreateStoreDialog();
        expect(billingService.fetchStoreCollection).toHaveBeenCalled();
    });

    it('should open a StoreDialogComponent on openEditStoreDialog()', () => {
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.openEditStoreDialog(<any>{someprop: 'somevalue'});
        const openDialogArgs = matDialog.open.calls.mostRecent().args;
        expect(openDialogArgs[0]).toBe(StoreDialogComponent);
        expect(openDialogArgs[1].data.nameEditable).toBe(false);
        expect(openDialogArgs[1].data.store).toEqual({someprop: 'somevalue'});
    });

    it('should refresh stores list when update store is successful', () => {
        billingService.fetchStoreCollection.and.returnValue(of({_embedded: {store: []}}));
        matDialog.open.and.returnValue({afterClosed: () => of({})});
        component.openEditStoreDialog(<any>{});
        expect(billingService.fetchStoreCollection).toHaveBeenCalled();
    });

    it('should show a snackbar with successful message when store saved', () => {
        billingService.fetchStoreCollection.and.returnValue(of({_embedded: {store: []}}));
        matDialog.open.and.returnValue({afterClosed: () => of({})});
        component.openEditStoreDialog(<any>{});
        expect(snackBar.open).toHaveBeenCalled();
        expect(snackBar.open.calls.mostRecent().args[0]).toContain('has been saved');
    });

    it('should open a StoreBlockDialogComponent on blockStore()', () => {
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.blockStore({});
        expect(matDialog.open).toHaveBeenCalledWith(StoreBlockDialogComponent);
    });

    it('should send an update store request when true comes from a store block dialog', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(true)});
        billingService.update.and.returnValue(EMPTY);
        component.blockStore(<any>{id: 23});
        expect(billingService.update).toHaveBeenCalledWith({id: 23, isActive: false});
    });

    it('should NOT send an update store request when false comes from a store block dialog', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(false)});
        billingService.update.and.returnValue(EMPTY);
        component.blockStore(<any>{id: 23});
        expect(billingService.update).not.toHaveBeenCalled();
    });

    it('should refresh stores list when update store is successful', () => {
        billingService.fetchStoreCollection.and.returnValue(of({_embedded: {store: []}}));
        matDialog.open.and.returnValue({afterClosed: () => of({})});
        billingService.update.and.returnValue(of({}));
        component.blockStore(<any>{});
        expect(billingService.fetchStoreCollection).toHaveBeenCalled();
    });

    it('should send an update store request on activateStore() call', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(false)});
        billingService.update.and.returnValue(EMPTY);
        component.activateStore(<any>{id: 23});
        expect(billingService.update).toHaveBeenCalledWith({id: 23, isActive: true});
    });

    it('should refresh stores list when update store is successful', () => {
        billingService.fetchStoreCollection.and.returnValue(of({_embedded: {store: []}}));
        matDialog.open.and.returnValue({afterClosed: () => of({})});
        billingService.update.and.returnValue(of({}));
        component.activateStore(<any>{});
        expect(billingService.fetchStoreCollection).toHaveBeenCalled();
    });
});
