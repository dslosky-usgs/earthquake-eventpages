import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { HazardAlertComponent } from './hazard-alert.component';

describe('HazardAlertComponent', () => {
  let component: HazardAlertComponent;
  let fixture: ComponentFixture<HazardAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HazardAlertComponent,

        MockComponent({
          inputs: ['bins', 'title', 'units', 'value'],
          selector: 'ground-failure-alert-bar'
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
