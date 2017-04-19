import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ShopifyAuthentifyComponent } from "./authentify/shopify-authentify.component";
import {ShopifyAuthentifyService} from "./authentify/shopify-authentify.service";

const routes = [
    {path: 'shopify/authentify', component: ShopifyAuthentifyComponent}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ShopifyAuthentifyService,
    ]
})
export class ShopifyModule {}