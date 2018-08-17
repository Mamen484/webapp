import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsManagementComponent } from './tags-management/tags-management.component';
import { SettingsBaseComponent } from './settings-base/settings-base.component';

const routes: Routes = [
    {
        path: '', component: SettingsBaseComponent, children: [
            {path: 'tags-management', component: TagsManagementComponent},
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
