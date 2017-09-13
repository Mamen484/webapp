import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';

import { UserService } from './services/user.service';
import { currentStoreReducer } from './reducers/current-store-reducer';
import { userInfoReducer } from './reducers/user-info-reducer';
import { StoreService } from './services/store.service';
import { channelsReducer } from './reducers/channels-reducer';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { AggregatedUserInfoResolveGuard } from './guards/aggregated-user-info-resolve.guard';
import { statisticsReducer } from './reducers/statistics-reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LocaleIdService } from './services/locale-id.service';
import { environment } from '../../environments/environment';
import { CheckProperLocaleGuard } from './guards/check-proper-locale.guard';
import { WindowRefService } from './services/window-ref.service';
import { InternationalAccountService } from './services/international-account.service';
import { SupportService } from './services/support.service';
import { SupportAuthInterceptor } from './interceptors/support-auth-interceptor';
import { supportSearchMock } from '../../mocks/support-search-mock';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { IsAuthorizedGuard } from './guards/is-authorized.guard';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot({
            userInfo: userInfoReducer,
            currentStore: currentStoreReducer,
            channels: channelsReducer,
            storeStatistics: statisticsReducer,
        }),

    ],
    providers: [
        AggregatedUserInfoResolveGuard,
        CheckProperLocaleGuard,
        IsAuthorizedGuard,
        LocaleIdService,
        InternationalAccountService,
        {provide: SupportService, useValue: {searchArticles}},
        WindowRefService,
        PasswordRecoveryService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: SupportAuthInterceptor, multi: true},
        UserService,
        StoreService,
        {provide: LOCALE_ID, useValue: environment.LOCALE_ID},
    ],
    declarations: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

export function searchArticles(query) {
    return query === 'empty'
        ? Observable.of({_embedded: {entries: []}}).delay(Math.round(Math.random() * 1200))
        : Observable.of(supportSearchMock).delay(Math.round(Math.random() * 1200));

}
