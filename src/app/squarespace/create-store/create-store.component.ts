import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { Store } from 'sfl-shared/entities';
import { SflAuthService, SflLocalStorageService, StoreService } from 'sfl-shared/services';
import { LocalStorageKey } from '../../core/entities/local-storage-key.enum';

@Component({
    selector: 'sf-create-store',
    templateUrl: './create-store.component.html',
    styleUrls: ['./create-store.component.scss']
})
export class CreateStoreComponent {

    constructor(protected route: ActivatedRoute,
                protected authService: SflAuthService,
                protected storeService: StoreService,
                protected router: Router,
                protected localStorage: SflLocalStorageService) {
    }

    createStore({email, password}) {
        this.route.data.pipe(
            flatMap(({spStore}) => {
                const store: any = Store.createForSquarespace(spStore, spStore.name);
                store.owner.email = email;
                store.owner.password = password;

                return this.storeService.createStore(store);
            }),
        )
            .subscribe(
                (store) => {
                    this.authService.loginByToken(store.owner.token);
                    this.localStorage.removeItem(LocalStorageKey.squarespaceState);
                    this.router.navigate(['register', 'create-account']);
                },
                () => this.router.navigate(['squarespace', 'error'])
            );
    }

}
