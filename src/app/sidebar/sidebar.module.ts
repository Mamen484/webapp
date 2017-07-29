import {NgModule} from '@angular/core';
import {SidebarComponent} from './sidebar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [SidebarComponent],
    exports: [SidebarComponent]
})
export class SidebarModule {
}
