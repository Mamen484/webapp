import { Component } from '@angular/core';
import { Store } from '../../core/entities/store';
import { StoreService } from '../../core/services/store.service';
import { MatDialog } from '@angular/material';
import { UserCreatedDialogComponent } from '../user-created-dialog/user-created-dialog.component';

@Component({
    selector: 'sf-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

    error = '';

    store = new Store();
    createdToken = '';
    images = [''];

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
        if (!formValid) {
            return;
        }
        this.assignImages();
        this.storeService.createStore(this.store).subscribe(
            (store: Store) => {
                this.createdToken = store.owner.token;
                this.openSuccessDialog();
            },
            ({error}) => {
                this.error = error.detail || error.exception && error.exception.message
            }
        );
    }

    createNewClient() {
        this.error = '';
        this.store = new Store();
    }

    addImage() {
        this.images.push('');
    }

    removeImage(index) {
        this.images.splice(index, 1);
    }

    trackBy(index) {
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
