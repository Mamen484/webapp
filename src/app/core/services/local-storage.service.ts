import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

/**
 * Wrapper over window localStorage, friendly to DI
 */

@Injectable()
export class LocalStorageService {

    constructor(protected windowRef: WindowRefService) {
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
