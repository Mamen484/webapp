import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriticalErrorComponent } from './critical-error/critical-error.component';
import { StoreNotFoundComponent } from './store-not-found/store-not-found.component';

const routes: Routes = [
    {path: 'critical-error', component: CriticalErrorComponent},
    {path: 'store-not-found', component: StoreNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorPagesRoutingModule {
}
