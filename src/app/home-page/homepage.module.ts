import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomePageResearchComponent } from './home-page-research/home-page-research.component';
import { HomePageBestSellerComponent } from './home-page-best-seller/home-page-best-seller.component';
import { HomePageKeyNumberComponent } from './home-page-key-number/home-page-key-number.component';
import { HomePagePlatformCardComponent } from './home-page-platform-card/home-page-platform-card.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        HomePageComponent,
        HomePageResearchComponent,
        HomePageBestSellerComponent,
        HomePageKeyNumberComponent,
        HomePagePlatformCardComponent
    ]
})
export class HomepageModule {}
