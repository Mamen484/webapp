import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Params } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ShopifyAuthentifyService } from "./shopify-authentify.service";

@Component({
    template: '',
})
export class ShopifyAuthentifyComponent implements OnInit {
    constructor(
       private route: ActivatedRoute,
       private service: ShopifyAuthentifyService
    ) {}

    ngOnInit(): void {
        this.route.queryParams
            .subscribe((params: Params) => {
                let hmac = params['hmac'];
                let shop = params['shop'];
                let code = params['code'];

                if (!shop) {
                    window.location.href = 'https://apps.shopify.com/shopping-feed-dev';
                } else if (!code) {
                    this.service.getAuthorizationUrl(shop).subscribe((url: string) => {
                        window.location.href = url;
                    });
                }
            });
    }
}