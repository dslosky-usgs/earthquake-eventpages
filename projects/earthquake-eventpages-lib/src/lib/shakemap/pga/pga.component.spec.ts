import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { PgaComponent } from './pga.component';

describe('PgaComponent', () => {
  let component: PgaComponent;
  let fixture: ComponentFixture<PgaComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: null
    };
    TestBed.configureTestingModule({
      declarations: [
        PgaComponent,

        MockComponent({
          inputs: [
            'overlays',
            'showScaleControl',
            'showAttributionControl',
            'bounds'
          ],
          selector: 'shared-map'
        }),

        MockPipe('shakemapOverlays'),
        MockPipe('sharedGetMapBounds')
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
