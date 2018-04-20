import {NgModule} from '@angular/core';
import {SidebarComponent} from './sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarContainerComponent } from './sidebar-container.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [SidebarComponent, SidebarContainerComponent],
    exports: [SidebarComponent, SidebarContainerComponent]
})
export class SidebarModule {
}
