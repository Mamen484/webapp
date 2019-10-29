import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { SquarespaceService } from '../squarespace.service';
import { Store } from 'sfl-shared/entities';
import { SflLocalStorageService, StoreService } from 'sfl-shared/services';
import { SquarespaceStore } from 'sfl-shared/entities';
import { LocalStorageKey } from '../../core/entities/local-storage-key.enum';

@Component({
    selector: 'sf-create-store',
    templateUrl: './create-store.component.html',
    styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent {

    constructor(protected route: ActivatedRoute,
                protected service: SquarespaceService,
                protected storeService: StoreService,
                protected router: Router,
                protected localStorage: SflLocalStorageService) {
    }

    createStore({email, password}) {
        this.route.queryParamMap.pipe(
            flatMap(queryParamMap => this.service.getStore(queryParamMap.get('code'), queryParamMap.get('state'))),
            flatMap((spStore: SquarespaceStore) => {
                const store = Store.createForSquarespace(spStore, spStore.name);
                store.owner.email = email;
                store.owner.password = password;

                return this.storeService.createStore(store);
            }),
        )
            .subscribe(
                (store) => {
                    this.localStorage.setItem('Authorization', `Bearer ${store.owner.token}`);
                    this.localStorage.removeItem(LocalStorageKey.squarespaceState);
                    this.router.navigate(['register', 'create-account']);
                },
                () => this.router.navigate(['squarespace', 'error'])
            );
    }

}
