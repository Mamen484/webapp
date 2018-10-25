import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared/shared.module';
import { SupportHelpCenterComponent } from './support-help-center/support-help-center.component';
import { UnauthenticatedMenuComponent } from './unauthenticated-menu.component';
import { SflMenuModule } from 'sfl-shared';

@NgModule({
    imports: [
        SharedModule,
        SflMenuModule,
    ],
    exports: [MenuComponent, UnauthenticatedMenuComponent],
    declarations: [MenuComponent, SupportHelpCenterComponent, UnauthenticatedMenuComponent]
})
export class MenuModule {
}
