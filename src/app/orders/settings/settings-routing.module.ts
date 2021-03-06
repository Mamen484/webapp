import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsManagementComponent } from './tags-management/tags-management.component';

const routes: Routes = [
    {path: 'tags-management', component: TagsManagementComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
