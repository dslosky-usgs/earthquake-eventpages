import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { OafService } from '../oaf.service';

/**
 * Display OAF product page with tabs
 */
@Component({
  selector: 'oaf',
  styleUrls: ['./oaf.component.scss'],
  templateUrl: './oaf.component.html'
})
export class OafComponent implements AfterViewInit, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(
    public eventService: EventService,
    public oafService: OafService
  ) {}

  ngAfterViewInit() {
    this.subscription.add(
      this.eventService.product$.subscribe(product => {
        return this.onProduct(product);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Sets the oaf product on the oaf service
   *
   * @param product
   *     product passed in from the event service
   */
  onProduct(product: any): void {
    if (product && product.type === 'oaf') {
      this.oafService.getOaf(product);
    }
  }
}
