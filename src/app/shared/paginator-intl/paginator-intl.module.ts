import { NgModule } from '@angular/core';
import { PaginatorIntlComponent } from './paginator-intl.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorIntl } from './paginator-intl';

@NgModule({
    declarations: [PaginatorIntlComponent],
    providers: [
        {provide: MatPaginatorIntl, useClass: PaginatorIntl}
    ],
    exports: [
        PaginatorIntlComponent
    ],
    imports: [
        MatPaginatorModule
    ]
})
export class PaginatorIntlModule {
}
