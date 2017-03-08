import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomePageSearchComponent } from './home-page-search/home-page-search.component';
import { HomePageBestSellerComponent } from './home-page-best-seller/home-page-best-seller.component';
import { HomePageKeyNumberComponent } from './home-page-key-number/home-page-key-number.component';
import { HomePagePlatformCardComponent } from './home-page-platform-card/home-page-platform-card.component';
import { RouterModule } from "@angular/router";
import { CoreModule } from "../core/core.module";


import {MaterialModule} from "@angular/material";


const routes = [
    {path: '', component: HomePageComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreModule,
        MaterialModule
    ],
    declarations: [
        HomePageComponent,
        HomePageSearchComponent,
        HomePageBestSellerComponent,
        HomePageKeyNumberComponent,
        HomePagePlatformCardComponent
    ],
    exports: [
        HomePageComponent,
        RouterModule,
        MaterialModule
    ],
})
export class HomepageModule {}
