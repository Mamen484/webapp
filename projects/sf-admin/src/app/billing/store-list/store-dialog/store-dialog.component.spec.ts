import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDialogComponent } from './store-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatAutocompleteModule, MatDialogRef } from '@angular/material';
import { EMPTY, of, Subject } from 'rxjs';
import { BillingStore } from '../billing-store';

describe('StoreDialogComponent', () => {
    let component: StoreDialogComponent;
    let fixture: ComponentFixture<StoreDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<StoreDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
            ],
            declarations: [StoreDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: matDialogRef},
                {provide: MAT_DIALOG_DATA, useValue: {}},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign store id, name and platform on selectStore() call', () => {
        component.selectStore(<any>{option: {value: {id: 22, name: 'some name', feed: {source: 'prestashop'}}}});
        expect(component.store.id).toBe(22);
        expect(component.store.name).toBe('some name');
        expect(component.store.platform).toBe('prestashop');
    });

    it('should reset the store and the search input when the search input value does not match the store name on blur', () => {
        component.store = {id: 22, name: 'some name', platform: 'google'};
        component.searchControl.setValue('amazon1');
        component.resetName();
        expect(component.store.id).not.toBeDefined();
        expect(component.store.name).not.toBeDefined();
        expect(component.store.platform).not.toBeDefined();
        expect(component.searchControl.value).toBe('');
    });

    it('should immediately return from save() if the previous server call is being processed', () => {
        component.processing = true;
        component.serverError = 'some error';
        component.save();
        expect(component.serverError).toBe('some error');
    });

    it('should reset the serverError on save()', () => {
        component.serverError = 'some error';
        component.onSave = () => EMPTY;
        component.save();
        expect(component.serverError).not.toBeDefined();
    });

    it('should reset processing and close the dialog when the save is successful', () => {
        const subject = new Subject();
        component.searchControl = <any>{valid: true, invalid: false};
        component.onSave = () => subject;
        component.save();
        component.processing = true;
        subject.next();
        expect(component.processing).toBe(false);
        expect(matDialogRef.close).toHaveBeenCalledWith(true);
    });

    it('should reset processing and set the errorMessage when save fails', () => {
        const subject = new Subject();
        component.searchControl = <any>{valid: true, invalid: false};
        component.onSave = () => subject;
        component.save();
        component.processing = true;
        subject.error('some error');
        expect(component.processing).toBe(false);
        expect(matDialogRef.close).not.toHaveBeenCalled();
        expect(component.serverError).toBe('some error');
    });

});

describe('StoreDialogComponent constructor', () => {

    it('should assign onSave', () => {
        const component = new StoreDialogComponent({onSave: () => of({})}, <any>{});
        expect(component.onSave).toBeDefined();
    });
    it('should assign a store if it is in the data', () => {
        const component = new StoreDialogComponent({onSave: () => of({}), store: new BillingStore()}, <any>{});
        expect(component.store).toEqual(new BillingStore());
    });

    it('should assign a nameEditable if it is in the data', () => {
        const component = new StoreDialogComponent({onSave: () => of({}), nameEditable: false}, <any>{});
        expect(component.nameEditable).toBe(false);
    });

    it('should assign a default value of nameEditable if it is NOT in the data', () => {
        const component = new StoreDialogComponent({onSave: () => of({})}, <any>{});
        expect(component.nameEditable).toBe(true);
    });
});
