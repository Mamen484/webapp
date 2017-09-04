import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { LocaleIdService } from '../services/locale-id.service';
import { UserService } from '../services/user.service';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';

@Injectable()
export class CheckProperLocaleGuard implements CanActivate {

    constructor(protected _userService: UserService, protected localeIdService: LocaleIdService, protected windowRef: WindowRefService) {
    }

    canActivate(): Observable<boolean> {
        return this._userService.fetchAggregatedInfo().map((userInfo: AggregatedUserInfo) => {
            if (environment.production && LocaleIdService.detectLocale(userInfo.language) !== this.localeIdService.localeId) {
                this.windowRef.nativeWindow.location.href = '/' + LocaleIdService.detectLocale(userInfo.language);
                return false;
            }
            return true;
        });
    }
}
