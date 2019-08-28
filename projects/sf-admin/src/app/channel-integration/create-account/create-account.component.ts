import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChannelPermissionService } from '../channel-permission.service';
import { ChannelService, StoreService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Channel, Country, Store, StoreStatus } from 'sfl-shared/entities';
import { of, throwError } from 'rxjs';
import { get, set } from 'lodash';
import { MatDialog } from '@angular/material';
import { CredentialsDialogComponent } from './credentials-dialog/credentials-dialog.component';

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
        head: ['feed', 'head'],
        productTag: ['feed', 'productTag'],
        separator: ['feed', 'separator'],
        enclosure: ['feed', 'enclosure'],
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
        head: new FormControl('', () => this.getValidationMessages(['feed', 'head'])),
        productTag: new FormControl('', [Validators.maxLength(1), () => this.getValidationMessages(['feed', 'productTag'])]),

        // exportType = CSV
        separator: new FormControl('', [Validators.maxLength(1), () => this.getValidationMessages(['feed', 'separator'])]),
        enclosure: new FormControl('', [Validators.maxLength(1), () => this.getValidationMessages(['feed', 'enclosure'])]),
        headerInFirstRaw: new FormControl(),
    });

    errorMessage: string;
    validationMessages = <{ [key: string]: any }>{};

    constructor(protected channelPermissionService: ChannelPermissionService,
                protected channelService: ChannelService,
                protected storeService: StoreService,
                protected matDialog: MatDialog) {
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
        this.channelService.listChannels({search: this.formGroup.get(['channelName']).value})
            .pipe(
                catchError(this.handleChannelError),
                flatMap((response) => response.total === 0 ? of({}) : throwError({detail: 'Channel error: channel already exists'})),
                flatMap(() => this.createStore()),
                flatMap((store: Store) => this.createChannel().pipe(
                    map((channel: Channel) => [store, channel]),
                )),
                flatMap(([store, channel]) => this.createChannelPermission(channel.id, store.id)),
            ).subscribe(() => {
                this.matDialog.open(CredentialsDialogComponent, {
                    data: {
                        channelName: this.formGroup.get(['channelName']).value,
                        login: this.formGroup.get(['login']).value,
                        password: this.formGroup.get(['password']).value,
                    }
                });
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
            countries: [this.formGroup.get(['country']).value],
            feedType: this.formGroup.get(['exportType']).value,
            feed: {
                head: this.formGroup.get(['head']).value,
                productTag: this.formGroup.get(['productTag']).value,
                separator: this.formGroup.get(['separator']).value,
                enclosure: this.formGroup.get(['enclosure']).value,
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
            country: this.formGroup.get(['country']).value,
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
