import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { HomepageSearchComponent } from './homepage-search/homepage-search.component';
import { HomePageBestSellerComponent } from './homepage-bestseller/homepage-bestseller.component';
import { HomepageKeyNumberComponent } from './homepage-key-number/homepage-key-number.component';
import { HomepagePlatformCardComponent } from './homepage-platform-card/homepage-platform-card.component';
import { RouterModule } from "@angular/router";
import { CoreModule } from "../core/core.module";
import {MaterialModule} from "@angular/material";
import {FormsModule} from "../../../node_modules/@angular/forms/src/form_providers";


const routes = [
    {path: '', component: HomepageComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [
        HomepageComponent,
        HomepageSearchComponent,
        HomePageBestSellerComponent,
        HomepageKeyNumberComponent,
        HomepagePlatformCardComponent
    ],
    exports: [
        RouterModule
    ],
})
export class HomepageModule {}
