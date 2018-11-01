import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { GroundFailurePinComponent } from './ground-failure-pin.component';

describe('GroundFailurePinComponent', () => {
  let component: GroundFailurePinComponent;
  let fixture: ComponentFixture<GroundFailurePinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroundFailurePinComponent,

        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailurePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
