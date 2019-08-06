import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../../../../../src/app/core/entities/country';
import { ChannelPermissionService } from '../channel-permission.service';
import { ChannelService, StoreService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Channel, Store, StoreStatus } from 'sfl-shared/entities';
import { of, throwError } from 'rxjs';
import { get, set } from 'lodash';

@Component({
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

    pathToFields = {
        login: ['owner', 'login'],
        email: ['owner', 'email'],
        password: ['owner', 'password'],
        channelName: ['name'],
        channelType: ['type'],
        country: ['country'],
        exportType: ['feedType'],
        xmlHead: ['feed', 'head'],
        xmlProductTag: ['feed', 'productTag'],
        csvSeparator: ['feed', 'separator'],
        csvRoundTrip: ['feed', 'enclosure'],
    };

    formGroup = new FormGroup({
        login: new FormControl('', [Validators.required, () => this.getValidationMessages(['owner', 'login'])]),
        email: new FormControl('', [Validators.required, Validators.email, () => this.getValidationMessages(['owner', 'email'])]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), () => this.getValidationMessages(['owner', 'password'])]),
        channelName: new FormControl('', [Validators.required, Validators.minLength(2), () => this.getValidationMessages(['name'])]),
        channelType: new FormControl('', [Validators.required, () => this.getValidationMessages(['type'])]),
        country: new FormControl('', [Validators.required, () => this.getValidationMessages(['country'])]),
        exportType: new FormControl('', [Validators.required, () => this.getValidationMessages(['feedType'])]),

        // exportType = XML
        xmlHead: new FormControl('', () => this.getValidationMessages(['feed', 'head'])),
        xmlProductTag: new FormControl('', () => this.getValidationMessages(['feed', 'productTag'])),

        // exportType = CSV
        csvSeparator: new FormControl('', () => this.getValidationMessages(['feed', 'separator'])),
        csvRoundTrip: new FormControl('', () => this.getValidationMessages(['feed', 'enclosure'])),
        headerInFirstRaw: new FormControl(),
    });

    countriesList;
    errorMessage: string;
    validationMessages = <{ [key: string]: any }>{};

    constructor(protected channelPermissionService: ChannelPermissionService,
                protected channelService: ChannelService,
                protected storeService: StoreService) {
    }

    ngOnInit() {
        this.clearValidationMessages();
    }

    displayFn(country: Country) {
        return country.name;
    }

    save() {
        this.errorMessage = undefined;
        this.validationMessages = {};
        if (this.formGroup.invalid) {
            return;
        }
        this.channelService.listChannels(this.formGroup.get(['channelName']).value)
            .pipe(
                catchError(this.handleChannelError),
                flatMap((response) => response.total === 0 ? of({}) : throwError({detail: 'Channel error: channel already exists'})),
                flatMap(() => this.createStore()),
                flatMap((store: Store) => this.createChannel().pipe(
                    map((channel: Channel) => [store, channel]),
                )),
                flatMap(([store, channel]) => this.createChannelPermission(channel.id, store.id)),
            ).subscribe(() => {
            },
            error => {
                this.errorMessage = error.detail;
                this.validationMessages = error.validationMessages;
                Object.values(this.formGroup.controls).forEach(control => {
                    control.updateValueAndValidity();
                })
            });
    }

    /**
     * Clear server messages when input is edited
     */
    protected clearValidationMessages() {
        Object.keys(this.formGroup.controls).forEach(key =>
            this.formGroup.controls[key].valueChanges.subscribe(() =>
                set(this.validationMessages, this.pathToFields[key], undefined)
            ));
    }

    protected createChannel() {
        return this.channelService.createChannel({
            name: this.formGroup.get(['channelName']).value,
            type: this.formGroup.get(['channelType']).value,
            countries: [this.formGroup.get(['country']).value.code],
            feedType: this.formGroup.get(['exportType']).value,
            feed: {
                head: this.formGroup.get(['xmlHead']).value,
                productTag: this.formGroup.get(['xmlProductTag']).value,
                separator: this.formGroup.get(['csvSeparator']).value,
                enclosure: this.formGroup.get(['csvRoundTrip']).value,
                headerFirst: this.formGroup.get(['headerInFirstRaw']).value,
            }
        }).pipe(catchError(this.handleChannelError));
    }

    protected handleChannelError({error}) {
        return throwError({
            detail: 'Channel error: ' + error.detail,
            validationMessages: error.validationMessages
        });
    }

    protected createStore() {
        return this.storeService.createStore({
            owner: {
                email: this.formGroup.get(['email']).value,
                login: this.formGroup.get(['login']).value,
                password: this.formGroup.get(['password']).value,
                payment: 'other',
            },
            status: StoreStatus.demo,
            country: this.formGroup.get(['country']).value.code,
            feed: {
                url: environment.defaultFeedSource,
                source: 'xml',
            },
        }).pipe(catchError(({error}) =>
            throwError({detail: 'Account error: ' + error.detail, validationMessages: error.validationMessages})
        ));
    }

    protected createChannelPermission(channelId: number, storeId: number) {
        return this.channelPermissionService.addChannelPermission(channelId, storeId, ['edit'])
            .pipe(catchError(({error}) => throwError({
                detail: 'Association error: ' + error.detail,
                validationMessages: error.validationMessages
            })));
    }

    protected getValidationMessages(path) {
        const field = get(this.validationMessages, path);
        if (!field) {
            return null;
        }
        const errors = Object.values(field);
        return errors.length
            ? {validationError: errors[0]}
            : null;
    }
}
