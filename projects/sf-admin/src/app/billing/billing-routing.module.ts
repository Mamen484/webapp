import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from './store-list/store-list.component';
import { GroupListComponent } from './group-list/group-list.component';

const routes: Routes = [
    {path: '', component: StoreListComponent},
    {path: 'groups', component: GroupListComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillingRoutingModule {
}
