import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfuiIconModule } from '../icon/icon.module';
import { SfuiBannerComponent } from './banner/banner.component';


@NgModule({
    declarations: [SfuiBannerComponent],
    imports: [
        CommonModule,
        SfuiIconModule,
    ],
    exports: [SfuiBannerComponent]
})
export class SfuiBannerModule {
}
