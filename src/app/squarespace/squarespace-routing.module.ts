import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentifyGuard } from './authentify.guard';
import { BlankComponent } from '../shared/blank.component';
import { ErrorComponent } from './error/error.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { HasErrorGuard } from './create-store/has-error.guard';


const routes: Routes = [
    {path: 'authentify', canActivate: [AuthentifyGuard], component: BlankComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'register', component: CreateStoreComponent, canActivate: [HasErrorGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SquarespaceRoutingModule {
}
