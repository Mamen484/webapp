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
  /**
   * This value will be set with an api resource in the futur,
   * for now it is set by a workaround
   *
   * @type {number}
   */
  public daysLeft: number = 30;

  /**
   * This value is hardcoded now, but should be provided in an API resource
   * @type {string}
   */
  public price: string = '99$';
  public channel: string;
  public channelImage: string;

  private paramsSubscription: Subscription;
  private queryParamsSubscription: Subscription;

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

    this.queryParamsSubscription = this.route.queryParams
        .subscribe((params: Params) => {
          params['daysLeft'] && (this.daysLeft = params['daysLeft']);
        })
  }

  ngOnDestroy(): void {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
    this.queryParamsSubscription && this.queryParamsSubscription.unsubscribe();
  }
}
