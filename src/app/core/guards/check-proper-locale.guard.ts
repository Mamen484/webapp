import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { LocaleIdService } from '../services/locale-id.service';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Location } from '@angular/common';

@Injectable()
export class CheckProperLocaleGuard implements CanActivate {

    constructor(protected localeIdService: LocaleIdService,
                protected windowRef: WindowRefService,
                protected appStore: Store<AppState>,
                protected location: Location) {
    }

    canActivate(): Observable<boolean> {
        return this.appStore.select('userInfo')
            .pipe(filter(userInfo => Boolean(userInfo)))
            .pipe(take(1))
            .pipe(map((userInfo: AggregatedUserInfo) => {
            if (environment.production === 'true' && LocaleIdService.detectLocale(userInfo.language) !== this.localeIdService.localeId) {
                let path = this.location.path().slice(0, 1) !== '/' ? '/' + this.location.path() : this.location.path();
                this.windowRef.nativeWindow.location.href = environment.BASE_HREF + '/' + LocaleIdService.detectLocale(userInfo.language) + path;
                return false;
            }
            return true;
        }));
    }
}
