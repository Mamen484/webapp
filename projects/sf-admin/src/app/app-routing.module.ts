import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthorizedGuard } from './login/is-authorized.guard';
import { CreateUserComponent } from './create-user/create-user.component';
import { SflLoginByTokenGuard } from 'sfl-shared/auth';

const routes: Routes = [
    {
        path: '', canActivate: [SflLoginByTokenGuard, IsAuthorizedGuard], children: [
            {path: '', redirectTo: 'billing', pathMatch: 'full'},
            {path: 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule)},
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
