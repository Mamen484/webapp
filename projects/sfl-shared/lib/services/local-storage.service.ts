import { Injectable } from '@angular/core';
import { SflWindowRefService } from './window-ref.service';

/**
 * Wrapper over window localStorage, friendly to DI.
 * Use just instead of the native local storage.
 */

@Injectable({
    providedIn: 'root'
})
export class SflLocalStorageService {

    constructor(protected windowRef: SflWindowRefService) {
    }

    get length() {
        return this.windowRef.nativeWindow.localStorage.length;
    }

    clear(): void {
        this.windowRef.nativeWindow.localStorage.clear();
    }

    getItem(key: string): string | any {
        return this.windowRef.nativeWindow.localStorage.getItem(key);
    }

    key(index: number): string | any {
        return this.windowRef.nativeWindow.localStorage.key(index);
    }

    removeItem(key: string): void {
        this.windowRef.nativeWindow.localStorage.removeItem(key);
    }

    setItem(key: string, data: string): void {
        this.windowRef.nativeWindow.localStorage.setItem(key, data);
    }
}
