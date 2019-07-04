import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SFL_API, SFL_APP_TOKEN, SFL_BASE_HREF, SFL_DEFAULT_LANGUAGE, SFL_LANGUAGE_OPTIONS, SFL_LEGACY_LINK } from 'sfl-shared/entities';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { SflLegacyLinkDirective } from './legacy-link.directive';
import { SflCountrySelectComponent } from './country-select/country-select.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * The main module required by Shopping Feed apps.
 * Contains some shared logic related to the communication with backend, security, etc.
 * To be decomposed to modules by the logic of use.
 */
@NgModule({
    imports: [
        CommonModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [SflLegacyLinkDirective, SflCountrySelectComponent],
    exports: [SflLegacyLinkDirective, SflCountrySelectComponent],
})
export class SflSharedModule {
    static forRoot(dependency: { baseHref, languageOptions, sflDefaultLanguage?, sflApi, sflAppToken, sflLegacyLink }): ModuleWithProviders {
        return {
            ngModule: SflSharedModule,
            providers: [
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
                {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
                {provide: SFL_BASE_HREF, useValue: dependency.baseHref},
                {provide: SFL_LANGUAGE_OPTIONS, useValue: dependency.languageOptions},
                {provide: SFL_DEFAULT_LANGUAGE, useValue: dependency.sflDefaultLanguage || 'en'},
                {provide: SFL_API, useValue: dependency.sflApi},
                {provide: SFL_APP_TOKEN, useValue: dependency.sflAppToken},
                {provide: SFL_LEGACY_LINK, useValue: dependency.sflLegacyLink},
            ]
        }
    }

    constructor() {
    }
}
