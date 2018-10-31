import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { StoreService } from '../../core/services/store.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { flatMap } from 'rxjs/operators';
import { StoreCharge } from 'sfl-shared/src/lib/core/entities';

@Component({
    selector: 'sf-accept-channel-dialog',
    templateUrl: './accept-channel-dialog.component.html',
    styleUrls: ['./accept-channel-dialog.component.scss']
})
export class AcceptChannelDialogComponent implements OnInit {
    charge: StoreCharge;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { logo: string, link: string },
                protected storeService: StoreService,
                protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.appStore.select('currentStore')
            .pipe(flatMap(store => this.storeService.getStoreCharge(store.id)))
            .subscribe(charge => this.charge = charge);
    }

}
