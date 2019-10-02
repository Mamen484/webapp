import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppcuesState } from './appcues-state.enum';
import { AppState } from '../../core/entities/app-state';

@Injectable({
    providedIn: 'root'
})
export class AppcuesService {

    protected state$ = new BehaviorSubject<AppcuesState>(AppcuesState.off);
    protected enabled = false;

    constructor(protected windowRef: SflWindowRefService,
                protected appStore: Store<AppState>,
                protected userService: SflUserService,
                protected router: Router) {
    }

    enable() {
        this.state$.next(AppcuesState.enabled);
    }

    markLoaded() {
        this.state$.next(AppcuesState.loaded);
    }

    getState() {
        return this.state$.asObservable();
    }
}
