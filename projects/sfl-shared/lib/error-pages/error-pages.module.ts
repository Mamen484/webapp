import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SflMenuModule } from 'sfl-shared/menu';

import { SflErrorPagesRoutingModule } from './error-pages-routing.module';
import { CriticalErrorComponent } from './critical-error/critical-error.component';
import { StoreNotFoundComponent } from './store-not-found/store-not-found.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderNotFoundComponent } from './order-not-found/order-not-found.component';
import { SflErrorPageComponent } from './error-page/error-page.component';

/**
 * Contains error pages.
 * To show an error page, you need to import this page and redirect a user to the route of appropriate page.
 * Make sure to put the module to the very bottom of the imported modules list, as it contains a wildcard route for 404 page.
 */
@NgModule({
    imports: [
        CommonModule,
        SflMenuModule,
        SflErrorPagesRoutingModule
    ],
    declarations: [
        CriticalErrorComponent,
        SflErrorPageComponent,
        StoreNotFoundComponent,
        NotFoundComponent,
        OrderNotFoundComponent,
    ],
    exports: [
        SflErrorPageComponent,
    ]
})
export class SflErrorPagesModule {
}
