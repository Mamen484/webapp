import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsDataService } from '../tickets/tickets-list/tickets-data.service';
import { TimelineService } from 'sfl-shared/services';
import { SidebarService as AbstractSidebarService } from 'sfl-tools/src/lib/sidebar';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements AbstractSidebarService {

  constructor(
      private router: Router,
      private ticketsDataService: TicketsDataService,
      private timelineService: TimelineService,
      private route: ActivatedRoute
  ) { }

  navigateToTimeline() {
    this.router.routeReuseStrategy.shouldDetach(this.route.snapshot);
    this.router.navigate(['/timeline']).then(data => {
      if (!data) {
        // user tries to load timeline route, that is active now, so we need to reload the timeline data
        this.timelineService.emitUpdatedTimeline();
      }
    });
  }
}
