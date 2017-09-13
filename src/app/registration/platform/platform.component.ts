import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChannelLogoService } from '../../core/services/channel_logo.service';

@Component({
    selector: 'app-plateform',
    templateUrl: 'platform.component.html',
    styleUrls: ['platform.component.scss']
})
export class PlatformComponent implements OnInit, OnDestroy {
    public daysLeft: number = 30;
    public price: number = 99;
    public channel: string;
    public channelImage: string;

    private paramsSubscription: Subscription;
    private queryParamsSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private logoService: ChannelLogoService) {
    }

    ngOnInit() {
        this.paramsSubscription = this.route.params
            .subscribe((params: Params) => {
                this.channel = params['channelName'];
                this.channelImage = this.logoService.getLogoUrl(this.channel);
            });

        this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
            this.daysLeft = params['daysLeft'] || 30;
            this.price = params['price'] || 99;
        });
    }

    ngOnDestroy(): void {
        this.paramsSubscription && this.paramsSubscription.unsubscribe();
        this.queryParamsSubscription && this.queryParamsSubscription.unsubscribe();
    }
}
