import {NgModule} from '@angular/core';
import {SidebarComponent} from './sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { SflSidebarModule } from 'sfl-shared/sidebar';

@NgModule({
    imports: [
        SharedModule,
        SflSidebarModule,
    ],
    declarations: [SidebarComponent],
    exports: [SidebarComponent]
})
export class SidebarModule {
}
