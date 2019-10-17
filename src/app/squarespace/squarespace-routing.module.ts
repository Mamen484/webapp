import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentifyGuard } from './authentify.guard';
import { BlankComponent } from '../shared/blank.component';


const routes: Routes = [
    {path: '/authentify', canActivate: [AuthentifyGuard], component: BlankComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SquarespaceRoutingModule {
}
