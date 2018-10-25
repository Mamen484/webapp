import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflSidebarContainerComponent } from './sidebar-container.component';
import { MatSidenavModule } from '@angular/material';
import { SflToggleSidebarService } from './toggle-sidebar.service';

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
    ],
    declarations: [SflSidebarContainerComponent],
    providers: [SflToggleSidebarService],
    exports: [SflSidebarContainerComponent],
})
export class SflSidebarModule {
}
