import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDialogComponent } from './store-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatAutocompleteModule, MatDialogRef } from '@angular/material';

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
        component.selectStore(<any>{option: {value: {id: 22, name: 'some name', feed: {source: 'amazon'}}}});
        expect(component.store).toEqual(<any>{id: 22, name: 'some name', platform: 'amazon'});
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

});
