import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesConfigurationComponent } from './categories-configuration/categories-configuration.component';

const routes: Routes = [
    {path: '', component: CategoriesConfigurationComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChannelSetupRoutingModule {
}
