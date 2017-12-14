import { StoreError } from './store-error';
import { has, values, get } from 'lodash';

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

    setErrors({validationMessages}: StoreError) {
        this.owner.login = this.getValue(validationMessages, 'owner.login');
        this.owner.email = this.getValue(validationMessages, 'owner.email');
        this.owner.password = this.getValue(validationMessages, 'owner.password');
        this.country = this.getValue(validationMessages, 'country');
        this.feed.url = this.getValue(validationMessages, 'feed.url');
        this.feed.source = this.getValue(validationMessages, 'feed.source');
        this.feed.settings.csvFieldSeparator = this.getValue(validationMessages, 'feed.settings.csvFieldSeparator');
        this.feed.settings.xmlProductNode = this.getValue(validationMessages, 'feed.settings.xmlProductNode');
    }

    hasError(path) {
        return Boolean(has(this, path) && get(this, path));
    }

    getError(path) {
        return get(this, path);
    }

    reset() {
        this.owner = {};
        this.country = undefined;
        this.feed = {settings: {}};
    }

    protected getValue(object, path) {
        return has(object, path) ? values(get(object, path))[0] : undefined;
    }
}
