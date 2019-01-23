import { Component, Inject, ViewChild } from '@angular/core';
import { BillingStore } from '../billing-store';
import { MAT_DIALOG_DATA, MatDialogRef, MatOption } from '@angular/material';
import { clone } from 'lodash';
import { AbstractControl, FormControl, NgForm } from '@angular/forms';
import { Store } from 'sfl-shared/entities';
import { Observable } from 'rxjs';

@Component({
    selector: 'sfa-store-dialog',
    templateUrl: './store-dialog.component.html',
    styleUrls: ['./store-dialog.component.scss']
})
export class StoreDialogComponent {

    @ViewChild(NgForm) form: NgForm;

    store = new BillingStore();
    onSave: (store: BillingStore) => Observable<any>;
    nameEditable = true;
    storeSearchResults;
    processing = false;
    serverError: string;
    searchControl = new FormControl('', () => {
        return !this.store.name ? {required: true} : null;
    });

    constructor(@Inject(MAT_DIALOG_DATA) protected data: {
                    onSave: (store: BillingStore) => Observable<any>,
                    store?: BillingStore,
                    nameEditable?: boolean,
                },
                protected matDialogRef: MatDialogRef<BillingStore>) {
        this.onSave = data.onSave;
        if (this.data.store) {
            this.store = clone(this.data.store);
        }
        if (typeof this.data.nameEditable !== 'undefined') {
            this.nameEditable = this.data.nameEditable;
        }
    }

    save() {
        if (this.processing) {
            return;
        }
        this.serverError = undefined;
        this.searchControl.updateValueAndValidity();
        if (!this.form.valid || !this.searchControl.valid) {
            this.searchControl.markAsDirty();
            Object.values(this.form.controls)
                .forEach((control: AbstractControl) => control.markAsDirty());
            return;
        }
        this.processing = true;
        this.onSave(this.store).subscribe(() => {
            this.processing = false;
            this.matDialogRef.close(true);
        }, error => {
            this.serverError = error;
            this.processing = false;
        });

    }

    displayFn(store: Store) {
        return store ? store.name : undefined;
    }

    selectStore({option}: { option: MatOption }) {
        const store = option.value;
        this.store.name = store.name;
        this.store.id = store.id;
        this.store.platform = <any>store.feed.source;
        this.searchControl.updateValueAndValidity();
    }

    resetName() {
        const searchInput = this.searchControl.value && this.searchControl.value.name;
        if (!this.store.id || !this.store.platform || this.store.name !== searchInput) {
            this.store.id = undefined;
            this.store.name = undefined;
            this.store.platform = undefined;
            this.searchControl.setValue('');
        }
    }

}
