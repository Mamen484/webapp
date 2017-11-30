import { Component, OnInit } from '@angular/core';
import { Store } from '../../core/entities/store';
import { StoreService } from '../../core/services/store.service';

@Component({
    selector: 'sf-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

    successfullyCreated = false;
    error = '';

    store = new Store();

    constructor(protected storeService: StoreService) {
    }

    ngOnInit() {
    }

    save(formValid) {
        if (!formValid) {
            return;
        }
        this.error = '';
        this.storeService.createStore(this.store).subscribe(
            () => this.successfullyCreated = true,
            error => this.error = JSON.parse(error.error).detail
        );
    }

    createNewClient() {
        this.successfullyCreated = false;
        this.error = '';
        this.store = new Store();
    }

    addImage() {
        (<string[]>this.store.feed.mapping.image).push('');
    }

    removeImage(index) {
        (<string[]>this.store.feed.mapping.image).splice(index, 1);
    }

    trackBy(index) {
        return index;
    }

}
