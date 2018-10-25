import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuContainerComponent } from './menu-container.component';
import { MatButtonModule, MatIconModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
    ],
    declarations: [
        MenuContainerComponent,
    ],
    exports: [
        MenuContainerComponent,
    ]
})
export class SflMenuModule {
}
