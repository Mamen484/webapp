import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflSidebarContainerComponent } from './sidebar-container.component';
import { MatListModule, MatSidenavModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SflLeftNavigationComponent } from './left-navigation/sfl-left-navigation.component';

/**
 * A module to easily build the left sidebar.
 * Contains a sidebar container and a service to hide/show the sidebar from anywhere of application.
 */
@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        FlexLayoutModule,
        MatListModule,
    ],
    declarations: [SflSidebarContainerComponent, SflLeftNavigationComponent],
    exports: [SflSidebarContainerComponent, SflLeftNavigationComponent],
})
export class SflSidebarModule {
}
