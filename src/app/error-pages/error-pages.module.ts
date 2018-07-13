import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { CriticalErrorComponent } from './critical-error/critical-error.component';
import { StoreNotFoundComponent } from './store-not-found/store-not-found.component';
import { MenuModule } from '../menu/menu.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderNotFoundComponent } from './order-not-found/order-not-found.component';

@NgModule({
    imports: [
        CommonModule,
        MenuModule,
        ErrorPagesRoutingModule
    ],
    declarations: [
        CriticalErrorComponent,
        StoreNotFoundComponent,
        NotFoundComponent,
        OrderNotFoundComponent,
    ]
})
export class ErrorPagesModule {
}
