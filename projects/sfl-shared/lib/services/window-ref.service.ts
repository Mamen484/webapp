import { Injectable } from '@angular/core';

/**
 * A unit-test friendly wrapper over a Window object.
 */
@Injectable({
    providedIn: 'root'
})
export class SflWindowRefService {

    get nativeWindow(): any {
        return window;
    }

}
