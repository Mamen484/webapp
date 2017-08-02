import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          UserService,
          {provide: Http, useValue: {get: () => Observable.of({})}}
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
