import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflToggleSidebarService } from './toggle-sidebar.service';
import { ModuleImportGuard } from './entities/module-import-guard';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        SflToggleSidebarService,
    ]
})
export class SflCoreModule {
    constructor(@Optional() @SkipSelf() parentModule?: SflCoreModule) {
        ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'SflCoreModule');
    }
}
