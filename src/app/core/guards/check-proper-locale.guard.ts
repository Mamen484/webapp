import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { SflLocaleIdService } from 'sfl-shared';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Location } from '@angular/common';
import { ChannelLanguage } from '../entities/channel-language.enum';

@Injectable()
export class CheckProperLocaleGuard implements CanActivate {

    constructor(protected localeIdService: SflLocaleIdService,
                protected windowRef: WindowRefService,
                protected appStore: Store<AppState>,
                protected location: Location) {
    }

    canActivate(): Observable<boolean> {
        return this.appStore.select('userInfo')
            .pipe(filter(userInfo => Boolean(userInfo)))
            .pipe(take(1))
            .pipe(map((userInfo: AggregatedUserInfo) => {
                if (environment.production === 'true'
                    && SflLocaleIdService.detectLocale(userInfo.language, ChannelLanguage) !== this.localeIdService.localeId) {
                    let path = this.location.path().slice(0, 1) !== '/' ? '/' + this.location.path() : this.location.path();
                    this.windowRef.nativeWindow.location.href =
                        environment.BASE_HREF + '/' + SflLocaleIdService.detectLocale(userInfo.language, ChannelLanguage) + path;
                    return false;
                }
                return true;
            }));
    }
}
