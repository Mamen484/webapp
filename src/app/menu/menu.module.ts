import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared/shared.module';
import { SupportHelpCenterComponent } from './support-help-center/support-help-center.component';
import { SflMenuModule } from 'sfl-shared/menu';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        SflMenuModule,
        RouterModule,
    ],
    exports: [MenuComponent],
    declarations: [MenuComponent, SupportHelpCenterComponent]
})
export class MenuModule {
}
