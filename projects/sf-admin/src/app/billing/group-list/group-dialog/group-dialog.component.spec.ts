import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDialogComponent } from './group-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatAutocompleteModule, MatDialogRef } from '@angular/material';
import { EMPTY, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('GroupDialogComponent', () => {
    let component: GroupDialogComponent;
    let fixture: ComponentFixture<GroupDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<GroupDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
            ],
            declarations: [GroupDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: matDialogRef},
                {provide: MAT_DIALOG_DATA, useValue: {group: {stores: []}}},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a store on addStore() call', () => {
        component.addStore(<any>{id: 22, name: 'some store'});
        expect(component.group.stores[0].id).toBe(22);
        expect(component.group.stores[0].name).toBe('some store');
    });

    it('should assign remove a store on remove() call', () => {
        component.group.stores = <any>[{id: 22, name: 'some store'},
            {id: 23, name: 'some store 2'},
            {id: 24, name: 'some store 3'}];
        component.remove(1);
        expect(component.group.stores.length).toBe(2);
        expect(component.group.stores[0].id).toBe(22);
        expect(component.group.stores[1].id).toBe(24);
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
        component.group.name = 'some name';
        component.onSave = () => subject;
        component.save();
        component.processing = true;
        subject.next();
        expect(component.processing).toBe(false);
        expect(matDialogRef.close).toHaveBeenCalledWith(true);
    });

    it('should reset processing and set the errorMessage when save fails', () => {
        const subject = new Subject();
        component.group.name = 'some name';
        component.onSave = () => subject;
        component.save();
        component.processing = true;
        subject.error('some error');
        expect(component.processing).toBe(false);
        expect(matDialogRef.close).not.toHaveBeenCalled();
        expect(component.serverError).toBe('some error');
    });
});
