import { ScrollHandlerDirective } from './scroll-handler.directive';
import { ScrollDispatcher } from '@angular/cdk/overlay';

describe('ScrollHandlerDirective', () => {
  it('should create an instance', () => {
    const directive = new ScrollHandlerDirective(<any>{});
    expect(directive).toBeTruthy();
  });
});
