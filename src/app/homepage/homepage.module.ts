import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
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
        FormsModule,
    ],
    declarations: [
        HomepageComponent,
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
