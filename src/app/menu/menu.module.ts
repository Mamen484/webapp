import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared/shared.module';
import { SupportHelpCenterComponent } from './support-help-center/support-help-center.component';
import { MenuContainerComponent } from './menu-container.component';
import { UnauthenticatedMenuComponent } from './unauthenticated-menu.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [MenuComponent, MenuContainerComponent, UnauthenticatedMenuComponent],
    declarations: [MenuComponent, SupportHelpCenterComponent, MenuContainerComponent, UnauthenticatedMenuComponent]
})
export class MenuModule {
}
