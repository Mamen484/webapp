import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SflLocaleIdService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
import { ChannelLanguage } from '../entities/channel-language.enum';

@Injectable()
export class CheckProperLocaleGuard implements CanActivate {

    constructor(protected localeIdService: SflLocaleIdService,
                protected windowRef: SflWindowRefService,
                protected userService: SflUserService,
                protected location: Location) {
    }

    canActivate(): Observable<boolean> {
        return this.userService.fetchAggregatedInfo()
            .pipe(map(userInfo => {
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
