import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [TimelineComponent]
})
export class TimelineModule {
}
