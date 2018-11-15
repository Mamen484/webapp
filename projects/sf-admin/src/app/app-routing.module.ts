import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthorizedGuard } from './login/is-authorized.guard';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
    {
        path: '', component: AdminBaseComponent, canActivate: [IsAuthorizedGuard], children: [
            {path: '', redirectTo: '/billing', pathMatch: 'full'},
            {path: 'billing', loadChildren: 'sf-admin/src/app/billing/billing.module#BillingModule'},
            {path: 'create-user', component: CreateUserComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
