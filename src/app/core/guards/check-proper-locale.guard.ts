import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { LocaleIdService } from '../services/locale-id.service';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

@Injectable()
export class CheckProperLocaleGuard implements CanActivate {

    constructor(protected localeIdService: LocaleIdService,
                protected windowRef: WindowRefService,
                protected appStore: Store<AppState>) {
    }

    canActivate(): Observable<boolean> {
        return this.appStore.select('userInfo').take(1).map((userInfo: AggregatedUserInfo) => {
            if (environment.production === 'true' && LocaleIdService.detectLocale(userInfo.language) !== this.localeIdService.localeId) {
                this.windowRef.nativeWindow.location.href = environment.BASE_HREF + '/' + LocaleIdService.detectLocale(userInfo.language);
                return false;
            }
            return true;
        });
    }
}
