import { Injectable } from '@angular/core';
import { SflLocalStorageService } from 'sfl-shared/services';

export const MIN_ONLINE = 4;
export const MIN_TURNOVER = 850;
export const MAX_TURNOVER_DEVIATION = 250;
export const MAX_ONLINE_DEVIATION = 2;
export const TURNOVER_STORAGE_KEY = 'sfChannelTurnoverCache';
export const ONLINE_STORAGE_KEY = 'sfChannelOnlineCache';

@Injectable({
    providedIn: 'root'
})
export class ChannelStorageService {

    constructor(protected localStorage: SflLocalStorageService) {
    }

    getGeneratedTurnover(channelId) {
        return this.getGeneratedValue(TURNOVER_STORAGE_KEY, channelId, MIN_TURNOVER, MAX_TURNOVER_DEVIATION);
    }

    getGeneratedOnline(channelId) {
        return this.getGeneratedValue(ONLINE_STORAGE_KEY, channelId, MIN_ONLINE, MAX_ONLINE_DEVIATION, true);
    }

    protected getGeneratedValue(storageKey, channelId, minValue, deviation, round = false) {
        const memoryCache = JSON.parse(this.localStorage.getItem(storageKey) || '{}');
        if (!memoryCache[channelId]) {
            const newValue = minValue + Math.random() * deviation;
            memoryCache[channelId] = round ? Math.round(newValue) : newValue;
        }
        this.localStorage.setItem(storageKey, JSON.stringify(memoryCache));
        return memoryCache[channelId];
    }
}
