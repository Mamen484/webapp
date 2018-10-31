import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflToggleSidebarService } from './toggle-sidebar.service';
import { ModuleImportGuard } from './entities/src/module-import-guard';
import { SflLocaleIdService } from './locale-id.service';
import { SFL_API, SFL_APP, SFL_BASE_HREF, SFL_LANGUAGE_OPTIONS } from './entities/src/sfl-dependencies';
import { SflWindowRefService } from './window-ref.service';
import { SflLocalStorageService } from './local-storage.service';
import { SflUserService } from './user.service';

@NgModule({
    imports: [
        CommonModule
    ],
})
export class SflCoreModule {
    static forRoot({baseHref, languageOptions, sflApi, sflApp}) {
        return <ModuleWithProviders>{
            ngModule: SflCoreModule,
            providers: [
                SflToggleSidebarService,
                SflLocaleIdService,
                SflLocalStorageService,
                SflWindowRefService,
                SflUserService,
                {provide: SFL_BASE_HREF, useValue: baseHref},
                {provide: SFL_LANGUAGE_OPTIONS, useValue: languageOptions},
                {provide: SFL_API, useValue: sflApi},
                {provide: SFL_APP, useValue: sflApp},
            ]
        }
    }

    constructor(@Optional() @SkipSelf() parentModule?: SflCoreModule) {
        ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'SflCoreModule');
    }
}
