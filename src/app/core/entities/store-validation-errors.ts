import { StoreError } from './store-error';
import { has, values } from 'lodash';

export class StoreValidationErrors {
    owner?: {
        email?: string[],
        login?: string[],
        password?: string[],
    } = {};
    country?: string[];
    feed?: {
        url?: string[],
        source?: string[],
        settings?: {
            csvFieldSeparator?: string[],
            xmlProductNode?: string[],
        },
    } = {settings: {}};

    constructor({validationMessages}: StoreError) {
        if (has(validationMessages, 'owner.login')) {
            this.owner.login = values(validationMessages.owner.login);
        }
        if (has(validationMessages, 'owner.email')) {
            this.owner.email = values(validationMessages.owner.email);
        }
        if (has(validationMessages, 'owner.password')) {
            this.owner.password = values(validationMessages.owner.password);
        }
        if (has(validationMessages, 'country')) {
            this.country = values(validationMessages.country);
        }
        if (has(validationMessages, 'feed.url')) {
            this.feed.url = values(validationMessages.feed.url);
        }
        if (has(validationMessages, 'feed.source')) {
            this.feed.source = values(validationMessages.feed.source);
        }
        if (has(validationMessages, 'feed.settings.csvFieldSeparator')) {
            this.feed.settings.csvFieldSeparator = values(validationMessages.feed.settings.csvFieldSeparator);
        }
        if (has(validationMessages, 'feed.settings.xmlProductNode')) {
            this.feed.settings.xmlProductNode = values(validationMessages.feed.settings.xmlProductNode);
        }
    }
}
