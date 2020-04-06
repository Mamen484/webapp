import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsTableComponent } from './items-table.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { OrdersService } from '../../../core/services/orders.service';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EMPTY, of, throwError } from 'rxjs';
import { SkuModificationDialogComponent } from '../sku-modification-dialog/sku-modification-dialog.component';
import { SkuSavedSnackbarComponent } from '../sku-saved-snackbar/sku-saved-snackbar.component';
import { ArrayFromNumberPipe } from '../../../shared/array-from-number/array-from-number.pipe';
import { ChannelMap } from '../../../core/entities/channel-map.enum';
import { SuccessSnackbarConfig } from '../../../core/entities/success-snackbar-config';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';

describe('ItemsTableComponent', () => {
    let component: ItemsTableComponent;
    let fixture: ComponentFixture<ItemsTableComponent>;

    let matDialog: jasmine.SpyObj<MatDialog>;
    let snackbar: jasmine.SpyObj<MatSnackBar>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async(() => {

        matDialog = jasmine.createSpyObj(['open']);
        snackbar = jasmine.createSpyObj(['openFromComponent', 'open']);
        ordersService = jasmine.createSpyObj(['updateItemsReferences']);
        appStore = jasmine.createSpyObj(['select']);
        TestBed.configureTestingModule({
            declarations: [ItemsTableComponent, SfCurrencyPipe, ArrayFromNumberPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: MatSnackBar, useValue: snackbar},
                {provide: OrdersService, useValue: ordersService},
                {provide: Store, useValue: appStore},
            ],
            imports: [MatTableModule, FormsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsTableComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should initialize a datatable on component init', () => {
        component.order = <any>{
            createdAt: new Date('2012-12-12').getTime(),
            items: [{reference: '1324'}],
            payment: {},
            _embedded: {channel: {id: 0}},
        };
        fixture.detectChanges();
        expect(component.tableData.data[0].sku).toEqual('1324');
    });

    it('should make quantity editable when the channel is laRedoute', () => {
        component.order = <any>{
            createdAt: new Date('2012-12-12').getTime(),
            items: [{reference: '1324'}],
            payment: {},
            _embedded: {channel: {id: ChannelMap.laredoute}},
        };
        fixture.detectChanges();
        expect(component.allowEditQuantity).toEqual(true);
    });

    it('should make quantity UNeditable when the channel is cdiscount', () => {
        component.order = <any>{
            createdAt: new Date('2012-12-12').getTime(),
            items: [{reference: '1324'}],
            payment: {},
            _embedded: {channel: {id: ChannelMap.cdiscount}},
        };
        fixture.detectChanges();
        expect(component.allowEditQuantity).toEqual(false);
    });

    it('should take an item reference alias if exists', () => {
        component.order = <any>{
            createdAt: new Date('2012-12-12').getTime(),
            items: [{reference: 1324}],
            itemsReferencesAliases: {1324: 'some_alias'},
            payment: {},
            _embedded: {channel: {id: 0}},
        };
        fixture.detectChanges();
        expect(component.tableData.data[0].sku).toEqual('some_alias');
    });

    it('should open SkuModificationDialogComponent when call updateItemReference', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.updateItemReference(<any>{sku: 234});
        expect(matDialog.open).toHaveBeenCalledWith(SkuModificationDialogComponent, {data: {sku: 234}});
    });

    it('should call a updateItemsReferences endpoint when sku modification dialog returns a value', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => of('some_sku')});
        ordersService.updateItemsReferences.and.returnValue(EMPTY);
        appStore.select.and.returnValue(of({id: 34}));
        component.order = <any>{id: 12, itemsReferencesAliases: {100: 'anything', 200: 'anything else', 251: 'one more anything'}};
        component.updateItemReference(<any>{sku: '234', reference: '251'});
        expect(ordersService.updateItemsReferences).toHaveBeenCalledWith(34, 12, {100: 'anything', 200: 'anything else', 251: 'some_sku'})
    });

    it('should change displayed sku on successful sku modification', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => of('some_sku')});
        ordersService.updateItemsReferences.and.returnValue(of({}));
        appStore.select.and.returnValue(of({id: 34}));
        component.order = <any>{id: 12};
        const row = {sku: '234'};
        component.updateItemReference(<any>row);
        expect(row.sku).toBe('some_sku');
    });

    it('should open SkuSavedSnackbarComponent on successful sku modification', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => of('some_sku')});
        ordersService.updateItemsReferences.and.returnValue(of({}));
        appStore.select.and.returnValue(of({id: 34}));
        component.order = <any>{id: 12};
        component.updateItemReference(<any>{sku: '234'});
        expect(snackbar.openFromComponent).toHaveBeenCalledWith(SkuSavedSnackbarComponent, new SuccessSnackbarConfig());
    });

    it('should show an error snackbar when save sku fails', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => of('some_sku')});
        ordersService.updateItemsReferences.and.returnValue(throwError({message: 'err'}));
        appStore.select.and.returnValue(of({id: 34}));
        component.order = <any>{id: 12};
        component.updateItemReference(<any>{sku: '234'});
        expect(snackbar.open).toHaveBeenCalledWith('err', '', new ErrorSnackbarConfig());
    });

    it('should initialize a selectedQuantity field if the mode is `refund`', () => {
        component.order = <any>{items: [{reference: '135', quantity: 55}, {reference: '159', quantity: 89}], _embedded: {channel: {id: 0}}};
        component.mode = 'refund';
        component.ngOnInit();
        expect(component.selectedQuantity).toEqual({135: 55, 159: 89});
    });

    it('should count taxTotalAmount', () => {
        component.order = <any>{items: [{reference: '135', quantity: 55, taxAmount: 10.12}, {reference: '159', quantity: 89, taxAmount: 12.42}], _embedded: {channel: {id: 0}}};
        component.ngOnInit();
        expect(component.taxTotalAmount).toEqual(22.54);
    });
});

export class BlankPipe implements PipeTransform {
    transform(value: any): any {
        return value;
    }
}

@Pipe({name: 'sfCurrency'})
class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
