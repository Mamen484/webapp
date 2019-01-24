import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthorizedGuard } from './login/is-authorized.guard';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
    {
        path: '', canActivate: [IsAuthorizedGuard], children: [
            {path: '', redirectTo: '/billing', pathMatch: 'full'},
            {path: 'billing', loadChildren: './billing/billing.module#BillingModule'},
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
