import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../../../../../src/app/core/entities/country';
import { ChannelPermissionService } from '../channel-permission.service';
import { ChannelService, StoreService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Channel, Store } from 'sfl-shared/entities';
import { of, throwError } from 'rxjs';

@Component({
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

    formGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        channelName: new FormControl('', Validators.required),
        channelType: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        exportType: new FormControl('', Validators.required),

        // exportType = XML
        xmlHead: new FormControl(),
        xmlProductTag: new FormControl(),

        // exportType = CSV
        csvSeparator: new FormControl(),
        csvRoundTrip: new FormControl(),
        headerInFirstRaw: new FormControl(),
    });

    countriesList;

    constructor(protected channelPermissionService: ChannelPermissionService,
                protected channelService: ChannelService,
                protected storeService: StoreService) {
    }

    ngOnInit() {
    }

    displayFn(country: Country) {
        return country.name;
    }

    save() {
        this.channelService.listChannels(this.formGroup.get(['channelName']).value)
            .pipe(
                flatMap((response) => response.total === 0 ? of({}) : throwError({type: 'channelExists'})),
                flatMap(() => this.createStore()),
                flatMap((store: Store) => this.createChannel().pipe(map((channel: Channel) => [store, channel]))),
                flatMap(([store, channel]) => this.createChannelPermission(channel.id, store.id)),
                catchError(() => of({})),
            ).subscribe();
    }

    protected createChannel() {
        return this.channelService.createChannel({
            name: this.formGroup.get(['channelName']).value,
            type: this.formGroup.get(['channelType']).value,
            countries: [{code: this.formGroup.get(['country']).value.code}],
            feedType: this.formGroup.get(['exportType']).value,
            feed: {
                head: this.formGroup.get(['xmlHead']).value,
                productTag: this.formGroup.get(['xmlProductTag']).value,
                separator: this.formGroup.get(['csvSeparator']).value,
                enclosure: this.formGroup.get(['csvRoundTrip']).value,
                headerFirst: this.formGroup.get(['headerInFirstRaw']).value,
            }
        });
    }

    protected createStore() {
        return this.storeService.createStore({
            owner: {
                email: this.formGroup.get(['email']).value,
                login: this.formGroup.get(['login']).value,
                password: this.formGroup.get(['password']).value,
            },
            country: this.formGroup.get(['country']).value.code,
            feed: {
                url: environment.defaultFeedSource,
                source: this.formGroup.get(['exportType']).value,
            },
        });
    }

    protected createChannelPermission(channelId: number, storeId: number) {
        return this.channelPermissionService.addChannelPermission(channelId, storeId, []);
    }
}
