import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';

@Injectable()
export class CanLoadAdminGuard implements CanLoad {

    constructor(protected router: Router,
                protected appStore: Store<AppState>,
                protected userService: SflUserService,
                protected windowRefService: SflWindowRefService) {
    }

    canLoad(): Observable<boolean> {

        this.windowRefService.nativeWindow.location.href = environment.APP_URL + '/admin';
        return of(false);
    }
}
