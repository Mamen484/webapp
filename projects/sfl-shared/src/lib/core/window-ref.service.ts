import { Injectable } from '@angular/core';

@Injectable()
export class SflWindowRefService {

    get nativeWindow(): any {
        return window;
    }

}
