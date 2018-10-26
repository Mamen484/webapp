import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflToggleSidebarService } from './toggle-sidebar.service';
import { ModuleImportGuard } from './entities/module-import-guard';
import { SflLocaleIdService } from './locale-id.service';
import { SFL_BASE_HREF, SFL_LANGUAGE_OPTIONS } from './entities/sfl-dependencies';

@NgModule({
    imports: [
        CommonModule
    ],
})
export class SflCoreModule {
    static forRoot({baseHref, languageOptions}: { baseHref: string, languageOptions: { [localization: string]: string } }) {
        return {
            ngModule: SflCoreModule,
            providers: [
                SflToggleSidebarService,
                SflLocaleIdService,
                {provide: SFL_BASE_HREF, useValue: baseHref},
                {provide: SFL_LANGUAGE_OPTIONS, useValue: languageOptions},
            ]
        }
    }

    constructor(@Optional() @SkipSelf() parentModule?: SflCoreModule) {
        ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'SflCoreModule');
    }
}
