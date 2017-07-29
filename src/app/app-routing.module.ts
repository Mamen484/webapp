import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { AggregatedUserInfoResolveGuard } from './core/guards/aggregated-user-info-resolve.guard';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        resolve: {
            userInfo: AggregatedUserInfoResolveGuard
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
