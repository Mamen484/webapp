import { StatisticsComponent } from './statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
    {path: '', component: StatisticsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatisticsRoutingModule {
}
