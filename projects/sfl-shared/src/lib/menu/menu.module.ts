import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuContainerComponent } from './menu-container.component';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UnauthenticatedMenuComponent } from './unauthenticated-menu.component';

@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        FlexLayoutModule,
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
