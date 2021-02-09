import { Component, Input, OnInit } from '@angular/core';
import { AggregatedUserInfo, Permission, Store as UserStore } from 'sfl-shared/entities';
import { SET_STORE } from 'sfl-shared/reducers';
import { SflAuthService, SflUserService, SflWindowRefService, StoreService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';

@Component({
    selector: 'sfc-initialize',
    template: '<mat-progress-bar mode="indeterminate" color="accent" *ngIf="loading"></mat-progress-bar>',
    styles: [],
})
export class InitializeComponent implements OnInit {

    @Input() storeId;
    loading = true;

    constructor(private appStore: Store<any>,
                private userService: SflUserService,
                private storeService: StoreService,
                private authService: SflAuthService,
                private windowRefService: SflWindowRefService) {
    }

    ngOnInit() {
        if (!this.storeId) {
            throw new Error('The store id must be specified');
        }
        if (this.authenticated()) {
            this.getStore();
        }
    }

    getStore() {
        this.userService.fetchAggregatedInfo().subscribe((userInfo: AggregatedUserInfo) => {
            if (userInfo.isAdmin()) {
                this.storeService.getStore(this.storeId).subscribe((store: UserStore) => {
                    store.permission = Permission.createForAdmin();
                    this.appStore.dispatch({type: SET_STORE, store});
                    this.loading = false;
                    this.showDeferredContent();
                });
                return;
            }
            let enabledStore = userInfo.findEnabledStore(this.storeId) || userInfo.findFirstEnabledStore();
            this.appStore.dispatch({type: SET_STORE, store: enabledStore});
            this.loading = false;
            this.showDeferredContent();
        });
    }

    authenticated() {
        if (!this.authService.isLoggedIn()) {
            this.logout();
            return false;
        }
        return true;
    }

    logout() {
        this.windowRefService.nativeWindow.location.href = '/index/logout';
    }

    showDeferredContent() {
        document.querySelectorAll('.sfc-defer-display').forEach(item => {
            item.classList.remove('sfc-defer-display');
        });
    }

}
