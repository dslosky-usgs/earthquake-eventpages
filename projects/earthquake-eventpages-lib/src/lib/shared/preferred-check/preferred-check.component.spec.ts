import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';

import { PreferredCheckComponent } from './preferred-check.component';

describe('PreferredCheckComponent', () => {
  let component: PreferredCheckComponent;
  let fixture: ComponentFixture<PreferredCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreferredCheckComponent],
      imports: [MatIconModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
