import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerErrorComponent } from './server-error/server-error.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [ServerErrorComponent],
    entryComponents: [ServerErrorComponent],
    exports: [ServerErrorComponent]
})
export class SnackbarsModule {
}
