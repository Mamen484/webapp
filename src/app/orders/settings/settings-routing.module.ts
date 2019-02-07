import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsManagementComponent } from './tags-management/tags-management.component';
import { CreateTestOrderComponent } from './create-test-order/create-test-order.component';

const routes: Routes = [
    {path: 'tags-management', component: TagsManagementComponent},
    {path: 'create-test-order', component: CreateTestOrderComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
