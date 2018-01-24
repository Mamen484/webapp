import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { LocaleIdService } from '../services/locale-id.service';
import { UserService } from '../services/user.service';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';
import { Location } from '@angular/common';

@Injectable()
export class CheckProperLocaleGuard implements CanActivate {

    constructor(protected _userService: UserService,
                protected localeIdService: LocaleIdService,
                protected windowRef: WindowRefService,
                protected location: Location) {
    }

    canActivate(): Observable<boolean> {
        return this._userService.fetchAggregatedInfo().map((userInfo: AggregatedUserInfo) => {
            if (environment.production === 'true' && LocaleIdService.detectLocale(userInfo.language) !== this.localeIdService.localeId) {
                let path = this.location.path().slice(0, 1) !== '/' ? '/' + this.location.path() : this.location.path();
                this.windowRef.nativeWindow.location.href = environment.BASE_HREF + '/' + LocaleIdService.detectLocale(userInfo.language) + path;
                return false;
            }
            return true;
        });
    }
}
