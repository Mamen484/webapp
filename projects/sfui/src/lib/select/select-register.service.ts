import { Injectable } from '@angular/core';
import { SfuiSelectComponent } from './select.component';

@Injectable({
    providedIn: 'platform',
})
export class SfuiSelectRegister {

    selects = new Map();

    register(id, select: SfuiSelectComponent) {
        this.selects.set(id, select);
    }
}
