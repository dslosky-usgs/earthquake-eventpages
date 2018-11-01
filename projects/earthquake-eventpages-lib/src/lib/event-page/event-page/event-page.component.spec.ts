import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventPageComponent } from './event-page.component';
import { MockPipe } from '../../mock-pipe';
import { FormatterService } from '@core/formatter.service';

describe('EventPageComponent', () => {
  let fixture: ComponentFixture<EventPageComponent>,
    component: EventPageComponent;

  beforeEach(async(() => {
    const contributorServiceStub = {
      getContributors: jasmine.createSpy('contributorService::getContributors')
    };

    const eventServiceStub = {
      event$: of(new Event({})),
      getEvent: jasmine.createSpy('eventService::getEvent')
    };

    TestBed.configureTestingModule({
      declarations: [
        EventPageComponent,

        MockComponent({
          inputs: ['event'],
          selector: 'event-page-header'
        }),
        MockComponent({
          inputs: ['event', 'contributors'],
          selector: 'event-page-footer'
        }),
        MockComponent({
          inputs: ['event'],
          selector: 'event-page-navigation'
        }),
        MockComponent({
          inputs: ['product'],
          selector: 'shared-text-product'
        }),

        MockComponent({
          inputs: ['COOPERATOR', 'CONTACT', 'TITLE'],
          selector: 'hazdev-template'
        }),
        MockComponent({ selector: 'hazdev-template-navigation-group' }),

        MockComponent({
          inputs: ['display', 'navRouterLink'],
          selector: 'hazdev-template-navigation-item'
        }),

        MockComponent({ selector: 'mat-nav-list' }),

        MockPipe('cooperator'),
        MockPipe('sharedEventTitle'),
        MockPipe('eventDepth'),
        MockPipe('sharedLocation'),
        MockPipe('sharedDateTime')
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: ContributorService, useValue: contributorServiceStub },
        { provide: EventService, useValue: eventServiceStub },
        FormatterService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
