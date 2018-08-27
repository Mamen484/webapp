import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as GlobalSharedModule } from '../../shared/shared.module';
import { OrdersSubnavComponent } from './orders-subnav/orders-subnav.component';

@NgModule({
    imports: [
        CommonModule,
        GlobalSharedModule,
    ],
    declarations: [
        OrdersSubnavComponent,
    ],
    exports: [
        GlobalSharedModule,

        OrdersSubnavComponent,
    ],
})
export class SharedModule {
}
