import { Component, Input, OnInit } from '@angular/core';
import { Channel } from 'sfl-shared/entities';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/entities/app-state';
import { ConnectIntlChannelDialogComponent } from './connect-intl-channel-dialog/connect-intl-channel-dialog.component';
import { IntlRequestSuccessDialogComponent } from './intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from './request-failed-dialog/request-failed-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InternationalAccountService } from '../../../../core/services/international-account.service';

@Component({
    selector: 'sf-channel-connect-button',
    templateUrl: './connect-button.component.html',
    styleUrls: ['./connect-button.component.scss']
})
export class ConnectButtonComponent implements OnInit {

    @Input() channel: Channel;
    @Input() currentCountry: string;
    shopifyUSUser: boolean;
    internationalMode: boolean;

    constructor(private store: Store<AppState>,
                private dialog: MatDialog,
                private internationalAccountService: InternationalAccountService) {
    }

    ngOnInit(): void {
        this.store.select('currentStore').subscribe(store => {
            this.internationalMode = Boolean(this.currentCountry) && this.currentCountry.toLowerCase() !== store.country.toLowerCase();
            this.shopifyUSUser = store.country?.toLowerCase() === 'us'
                && store.feed.source.toLowerCase() === 'shopify'
                && store.planName === 'none';

        });
    }

    showInternationalChannelDialog() {
        let dialogRef = this.dialog.open(ConnectIntlChannelDialogComponent);
        dialogRef.afterClosed().subscribe((agree: boolean) => {
            if (!agree) {
                return;
            }
            this.internationalAccountService.sendInternationalAccountRequest().subscribe(
                () => this.dialog.open(IntlRequestSuccessDialogComponent),
                () => this.dialog.open(RequestFailedDialogComponent)
            );
        });
    }


}
