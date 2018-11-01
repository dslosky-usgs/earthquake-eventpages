import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoserveService } from '@core/geoserve.service';
import { FeRegionComponent } from './fe-region.component';

describe('FeRegionComponent', () => {
  let component: FeRegionComponent;
  let fixture: ComponentFixture<FeRegionComponent>;
  let observable;
  let response;

  beforeEach(async(() => {
    response = {
      fe: {
        features: [{ name: 'fename', number: 0 }]
      }
    };

    observable = {
      subscribe: cb => {
        cb(response);
      }
    };

    const geoserveServiceStub = {
      fe: jasmine.createSpy('geoserveService::fe').and.returnValue(observable)
    };

    TestBed.configureTestingModule({
      declarations: [FeRegionComponent],
      providers: [{ provide: GeoserveService, useValue: geoserveServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters/setters', () => {
    it('sets value and updates fe when latitude set', () => {
      const spy = spyOn(component, 'fetchFe');
      component.latitude = 0;
      expect(spy).toHaveBeenCalled();
      expect(component.latitude).toBe(0);
    });

    it('sets value updates fe when longitude set', () => {
      const spy = spyOn(component, 'fetchFe');
      component.longitude = 0;
      expect(spy).toHaveBeenCalled();
      expect(component.longitude).toBe(0);
    });
  });

  describe('fetchFe', () => {
    it('clears value if corrdinates not provided', () => {
      let feRegion;

      component.region.subscribe(fe => {
        feRegion = fe;
      });

      // None
      component.fetchFe(null, null);
      expect(feRegion).toBeNull();

      // No latitude
      component.fetchFe(null, 0);
      expect(feRegion).toBeNull();

      // No longitude
      component.fetchFe(0, null);
      expect(feRegion).toBeNull();
    });

    it('properly sets fe', () => {
      let feRegion;

      component.region.subscribe(fe => {
        feRegion = fe;
      });

      component.fetchFe(0, 0);
      expect(feRegion).toBe(response.fe.features[0]);

      component.fetchFe(10, 10);
      expect(feRegion).toBe(response.fe.features[0]);
    });
  });
});
