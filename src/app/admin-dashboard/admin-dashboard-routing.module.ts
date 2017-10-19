import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
    {
        path: '',
        component: AdminBaseComponent,
        children: [
            {path: '', component: DashboardComponent},
            {path: 'create-user', component: CreateUserComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminDashboardRoutingModule {
}
