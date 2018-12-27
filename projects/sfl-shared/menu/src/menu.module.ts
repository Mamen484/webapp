import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuContainerComponent } from './menu-container.component';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UnauthenticatedMenuComponent } from './unauthenticated-menu.component';
import { RouterModule } from '@angular/router';

/**
 * Contains the top menu container, which can be used to easily create a top menu.
 */
@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        FlexLayoutModule,
        RouterModule,
    ],
    declarations: [
        MenuContainerComponent,
        UnauthenticatedMenuComponent,
    ],
    exports: [
        MenuContainerComponent,
        UnauthenticatedMenuComponent,
    ]
})
export class SflMenuModule {
}
