import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SflWindowRefService {

    get nativeWindow(): any {
        return window;
    }

}
