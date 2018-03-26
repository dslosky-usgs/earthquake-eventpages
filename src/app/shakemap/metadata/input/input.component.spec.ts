import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatExpansionModule } from '@angular/material';

import { InputComponent } from './input.component';
import { FormatterService } from '../../../core/formatter.service';

import { MockPipe } from '../../../mock-pipe';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {

    const formatter = {};

    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatExpansionModule
      ],
      declarations: [
        InputComponent,

        MockPipe('sharedDegrees'),
        MockPipe('sharedNumber'),
        MockPipe('sharedLocation'),
        MockPipe('sharedDateTime')
      ],
      providers: [
        {provide: FormatterService, useValue: formatter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
