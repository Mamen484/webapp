import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { HomepageSearchComponent } from './homepage-search/homepage-search.component';
import { HomePageBestSellerComponent } from './homepage-bestseller/homepage-bestseller.component';
import { HomepageKeyNumberComponent } from './homepage-key-number/homepage-key-number.component';
import { HomepagePlatformCardComponent } from './homepage-platform-card/homepage-platform-card.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { AggregatedUserInfoResolveGuard } from '../core/guards/aggregated-user-info-resolve.guard';

const routes = [
    {
        path: '',
        component: HomepageComponent,
        resolve: {
            userInfo: AggregatedUserInfoResolveGuard
        }
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreModule,
        FormsModule
    ],
    declarations: [
        HomepageComponent,
        // HomepageSearchComponent,
        // HomePageBestSellerComponent,
        // HomepageKeyNumberComponent,
        // HomepagePlatformCardComponent
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AggregatedUserInfoResolveGuard
    ]
})
export class HomepageModule {
}
