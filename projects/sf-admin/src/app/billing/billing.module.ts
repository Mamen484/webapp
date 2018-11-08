import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { StoreListComponent } from './store-list/store-list.component';
import { MatTableModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BillingAuthInterceptor } from './billing-auth-interceptor.service';

@NgModule({
    imports: [
        CommonModule,
        BillingRoutingModule,
        MatTableModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BillingAuthInterceptor, multi: true},
    ],
    declarations: [StoreListComponent]
})
export class BillingModule {
}
