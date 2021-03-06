import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentifyGuard } from './authentify.guard';
import { BlankComponent } from '../shared/blank.component';
import { ErrorComponent } from './error/error.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { LoginContainerComponent } from '../shared/login-container/login-container.component';
import { HasErrorGuard } from './create-store/has-error.guard';
import { ResolveStoreGuard } from './create-store/resolve-store.guard';


const routes: Routes = [
    {path: 'authentify', canActivate: [AuthentifyGuard], component: BlankComponent},
    {
        path: '', component: LoginContainerComponent, children: [
            {path: 'error', component: ErrorComponent},
            {
                path: 'register',
                component: CreateStoreComponent,
                canActivate: [HasErrorGuard],
                resolve: {spStore: ResolveStoreGuard}
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SquarespaceRoutingModule {
}
