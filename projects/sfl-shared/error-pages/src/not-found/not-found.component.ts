import { Component, OnInit } from '@angular/core';

/**
 * Critical server error.
 * The error page will be shown when the non-existent route is visited.
 */
@Component({
  selector: 'sfl-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
