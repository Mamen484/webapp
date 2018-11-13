import { Component } from '@angular/core';
import { Store } from 'sfl-shared/entities';
import { StoreService } from '../../core/services/store.service';
import { MatDialog, MatSelectChange } from '@angular/material';
import { UserCreatedDialogComponent } from '../user-created-dialog/user-created-dialog.component';
import { StoreError } from 'sfl-shared/entities';
import { StoreValidationErrors } from 'sfl-shared/entities';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { createUserErrorValidator } from '../../core/validators/create-user-error.validator';
import { values } from 'lodash';

@Component({
    selector: 'sf-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {

    error = '';
    validationErrors = new StoreValidationErrors();

    store = new Store();
    createdToken = '';
    processing = false;
    showMappings = false;
    form = new FormGroup({
        login: new FormControl('', [
            Validators.required,
            createUserErrorValidator(this.validationErrors, 'owner.login'),
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            createUserErrorValidator(this.validationErrors, 'owner.password'),
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email,
            createUserErrorValidator(this.validationErrors, 'owner.email'),
        ]),
        country: new FormControl('', [
            createUserErrorValidator(this.validationErrors, 'country'),
        ]),
        url: new FormControl('', [
            Validators.required,
            Validators.pattern('(http|https|ftp)://.+'),
            createUserErrorValidator(this.validationErrors, 'feed.url'),
        ]),
        source: new FormControl('', [
            Validators.required,
            createUserErrorValidator(this.validationErrors, 'feed.source'),
        ]),
        separator: new FormControl('', [
            Validators.maxLength(1),
            createUserErrorValidator(this.validationErrors, 'feed.settings.csvFieldSeparator'),
        ]),
        productNode: new FormControl('', [
            createUserErrorValidator(this.validationErrors, 'feed.settings.xmlProductNode'),
        ]),
    });

    mappingsForm = new FormGroup({
        brand: new FormControl(''),
        brandLink: new FormControl(''),
        category: new FormControl(''),
        description: new FormControl(''),
        ean: new FormControl(''),
        ecotax: new FormControl(''),
        idParent: new FormControl(''),
        images: new FormArray([new FormControl('')]),
        link: new FormControl(''),
        name: new FormControl(''),
        oldPrice: new FormControl(''),
        quantity: new FormControl(''),
        reference: new FormControl(''),
        shippingCost: new FormControl(''),
        shippingTime: new FormControl(''),
        shortDescription: new FormControl(''),
        tva: new FormControl(''),
        weight: new FormControl(''),
    });

    constructor(protected storeService: StoreService, protected dialog: MatDialog) {
    }

    save() {
        this.error = '';
        this.validationErrors.reset();
        this.updateValueAndValidity();
        if (!this.form.valid) {
            return;
        }
        this.setStore();
        this.processing = true;
        this.storeService.createStore(this.store).subscribe(
            (store: Store) => {
                this.createdToken = store.owner.token;
                this.openSuccessDialog();
                this.processing = false
            },
            ({error}: { error: StoreError }) => {
                this.error = error.detail || error.exception && error.exception.message;
                if (error.validationMessages) {
                    this.validationErrors.setErrors(error);
                }
                this.processing = false;
                this.updateValueAndValidity();
            }
        );
    }


    addImage() {
        (<FormArray>this.mappingsForm.controls['images']).push(new FormControl(''));
    }

    removeImage(index) {
        (<FormArray>this.mappingsForm.controls['images']).removeAt(index);
    }

    openSuccessDialog() {
        this.dialog.open(UserCreatedDialogComponent, {
            data: {
                login: this.store.owner.login,
                password: this.store.owner.password,
                token: this.createdToken,
            },
            disableClose: true,
        });
    }

    setShowMappings(evt: MatSelectChange) {
        this.showMappings = evt.value === 'csv' || evt.value === 'xml' || evt.value === 'txt';
    }

    protected setStore() {
        this.store.owner.login = this.form.value.login;
        this.store.owner.password = this.form.value.password;
        this.store.owner.email = this.form.value.email;
        this.store.feed.url = this.form.value.url;
        this.store.country = this.form.value.country;
        this.store.feed.source = this.form.value.source;
        this.store.feed.settings.csvFieldSeparator = this.form.value.separator;
        this.store.feed.settings.xmlProductNode = this.form.value.productNode;
        if (this.store.feed.source === 'csv' || this.store.feed.source === 'txt' || this.store.feed.source === 'xml') {
            this.store.feed.mapping = this.mappingsForm.value;
            this.store.feed.mapping.images = this.store.feed.mapping.images.filter(im => Boolean(im));
        }
    }

    protected updateValueAndValidity() {
        values(this.form.controls).forEach(control => {
            if (control instanceof FormControl) {
                control.updateValueAndValidity();
                control.markAsTouched();
            }
        });
        this.form.updateValueAndValidity();
        this.form.markAsDirty();
    }

}
