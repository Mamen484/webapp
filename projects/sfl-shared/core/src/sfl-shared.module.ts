import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleImportGuard, SFL_API, SFL_APP_TOKEN, SFL_BASE_HREF, SFL_LANGUAGE_OPTIONS, SFL_LEGACY_LINK } from 'sfl-shared/entities';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { SflLegacyLinkDirective } from './legacy-link.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [SflLegacyLinkDirective],
    exports: [SflLegacyLinkDirective],
})
export class SflSharedModule {
    static forRoot({baseHref, languageOptions, sflApi, sflAppToken, sflLegacyLink}) {
        return <ModuleWithProviders>{
            ngModule: SflSharedModule,
            providers: [
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
                {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
                {provide: SFL_BASE_HREF, useValue: baseHref},
                {provide: SFL_LANGUAGE_OPTIONS, useValue: languageOptions},
                {provide: SFL_API, useValue: sflApi},
                {provide: SFL_APP_TOKEN, useValue: sflAppToken},
                {provide: SFL_LEGACY_LINK, useValue: sflLegacyLink},
            ]
        }
    }

    constructor(@Optional() @SkipSelf() parentModule?: SflSharedModule) {
        ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'SflSharedModule');
    }
}
