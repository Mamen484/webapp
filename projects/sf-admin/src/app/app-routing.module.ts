import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthorizedGuard } from './login/is-authorized.guard';
import { AdminBaseComponent } from './admin-base/admin-base.component';

const routes: Routes = [
    {
        path: '', component: AdminBaseComponent, canActivate: [IsAuthorizedGuard], children: [
            {path: '', redirectTo: '/billing', pathMatch: 'full'},
            {path: 'billing', loadChildren: 'sf-admin/src/app/billing/billing.module#BillingModule'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
