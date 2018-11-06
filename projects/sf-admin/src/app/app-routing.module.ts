import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IsAuthorizedGuard } from './login/is-authorized.guard';

const routes = [
    {path: '', component: AppComponent, canActivate: [IsAuthorizedGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
