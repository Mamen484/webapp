import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriticalErrorComponent } from './critical-error.component';
import { MenuModule } from '../menu/menu.module';

@NgModule({
    imports: [
        CommonModule,
        MenuModule,
    ],
    declarations: [
        CriticalErrorComponent
    ],
    exports: [
        CriticalErrorComponent
    ]
})
export class CriticalErrorModule {
}
