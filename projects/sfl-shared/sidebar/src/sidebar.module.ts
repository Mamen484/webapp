import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflSidebarContainerComponent } from './sidebar-container.component';
import { MatSidenavModule } from '@angular/material';

/**
 * A module to easily build the left sidebar.
 * Contains a sidebar container and a service to hide/show the sidebar from anywhere of application.
 */
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
