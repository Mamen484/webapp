import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared/shared.module';
import { MenuContainerComponent } from './menu-container.component';
import { UnauthenticatedMenuComponent } from './unauthenticated-menu.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [MenuComponent, MenuContainerComponent, UnauthenticatedMenuComponent],
    declarations: [MenuComponent, MenuContainerComponent, UnauthenticatedMenuComponent]
})
export class MenuModule {
}
