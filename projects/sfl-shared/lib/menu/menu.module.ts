import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuContainerComponent } from './menu-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
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
