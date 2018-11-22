import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BillingStore } from '../billing-store';
import { MAT_DIALOG_DATA, MatDialogRef, MatOption } from '@angular/material';
import { clone } from 'lodash';
import { AbstractControl, FormControl, NgForm } from '@angular/forms';
import { Store } from 'sfl-shared/entities';

@Component({
    selector: 'sfa-store-dialog',
    templateUrl: './store-dialog.component.html',
    styleUrls: ['./store-dialog.component.scss']
})
export class StoreDialogComponent implements OnInit {

    @ViewChild(NgForm) form: NgForm;

    store = new BillingStore();
    storeSearchResults;
    searchControl = new FormControl('', () => {
        return !this.store.name ? {required: true} : null;
    });

    constructor(@Inject(MAT_DIALOG_DATA) protected data, protected matDialogRef: MatDialogRef<BillingStore>) {
        if (data) {
            this.store = clone(data);
        }
    }

    ngOnInit() {
    }

    save() {
        if (!this.form.valid) {
            this.searchControl.markAsDirty();
            Object.values(this.form.controls)
                .forEach((control: AbstractControl) => control.markAsDirty());
            return;
        }
        this.matDialogRef.close(clone(this.store));
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
