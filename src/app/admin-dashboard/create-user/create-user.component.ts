import { Component } from '@angular/core';
import { Store } from '../../core/entities/store';
import { StoreService } from '../../core/services/store.service';
import { MatDialog } from '@angular/material';
import { UserCreatedDialogComponent } from '../user-created-dialog/user-created-dialog.component';
import { StoreError } from '../../core/entities/store-error';
import { StoreValidationErrors } from '../../core/entities/store-validation-errors';

@Component({
    selector: 'sf-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

    error = '';
    validationErrors: StoreValidationErrors;

    store = new Store();
    createdToken = '';
    images = [''];
    processing = false;

    constructor(protected storeService: StoreService, protected dialog: MatDialog) {
    }


    assignImages() {
        let images = this.images.filter(im => Boolean(im));
        if (images.length) {
            this.store.feed.mapping.images = images;
        } else {
            delete this.store.feed.mapping.images;
        }
    }

    save(formValid) {
        this.error = '';
        this.validationErrors = undefined;
        if (!formValid) {
            return;
        }
        this.assignImages();
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
                    this.validationErrors = new StoreValidationErrors(error);
                }
                this.processing = false;
            }
        );
    }

    addImage() {
        this.images.push('');
    }

    removeImage(index) {
        this.images.splice(index, 1);
    }

    trackByIndex(index) {
        return index;
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

    showMappingsForm() {
        return this.store.feed.source === 'csv'
            || this.store.feed.source === 'xml'
            || this.store.feed.source === 'txt';
    }

}
