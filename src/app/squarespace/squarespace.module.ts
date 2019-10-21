import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquarespaceRoutingModule } from './squarespace-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateStoreComponent } from './create-store/create-store.component';
import { ErrorComponent } from './error/error.component';
import { SflErrorPagesModule } from 'sfl-shared/error-pages';


@NgModule({
    declarations: [CreateStoreComponent, ErrorComponent],
    imports: [
        CommonModule,
        SquarespaceRoutingModule,
        SharedModule,
        SflErrorPagesModule,
    ]
})
export class SquarespaceModule {
}
