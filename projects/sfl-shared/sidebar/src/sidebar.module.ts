import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflSidebarContainerComponent } from './sidebar-container.component';
import { MatSidenavModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
    ],
    declarations: [SflSidebarContainerComponent],
    exports: [SflSidebarContainerComponent],
})
export class SflSidebarModule {
}
