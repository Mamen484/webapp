import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared/shared.module';
import { MenuContainerComponent } from './menu-container.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [MenuComponent, MenuContainerComponent],
    declarations: [MenuComponent, MenuContainerComponent]
})
export class MenuModule {
}
