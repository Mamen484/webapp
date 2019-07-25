import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';


const routes: Routes = [
    {path: '', component: ChannelListComponent},
    {path: 'create-account', component: CreateAccountComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChannelIntegrationRoutingModule {
}
