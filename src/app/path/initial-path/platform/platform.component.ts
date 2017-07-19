import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChannelLogoService} from "../../../core/channel/channel_logo.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-plateform',
  templateUrl: 'platform.component.html',
  styleUrls: ['platform.component.scss']
})
export class PlatformComponent implements OnInit, OnDestroy {
  public daysLeft: number = 30;
  public price: string = '99$';
  public channel: string;
  public channelImage: string;

  private paramsSubscription: Subscription;

  constructor(
      private route: ActivatedRoute,
      private logoService: ChannelLogoService
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params
        .subscribe((params: Params) => {
          this.channel = params['channelName'];
          this.channelImage = this.logoService.getLogoUrl(this.channel);
        });

    this.route.queryParams.subscribe((params: Params) => {
      this.daysLeft = params['daysLeft'] || 30;
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
  }
}
