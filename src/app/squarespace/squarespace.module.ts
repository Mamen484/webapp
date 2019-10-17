import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquarespaceRoutingModule } from './squarespace-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SquarespaceRoutingModule,
        SharedModule,
    ]
})
export class SquarespaceModule {
}
