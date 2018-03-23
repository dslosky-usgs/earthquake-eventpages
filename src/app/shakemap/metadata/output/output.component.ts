import { Component, OnInit, Input } from '@angular/core';
import { FormatterService } from '../../../core/formatter.service';
@Component({
  selector: 'shakemap-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  public names: any = {
    'groundMotions': {
      'PGA': 'PGA',
      'PGV': 'PGV',
      'pga': 'PGA',
      'pgv': 'PGV',
      'SA(0.3)': 'SA(0.3 s)',
      'SA(1.0)': 'SA(1.0 s)',
      'SA(3.0)': 'SA(3.0 s)',
      'psa03': 'SA(0.3 s)',
      'psa10': 'SA(1.0 s)',
      'psa30': 'SA(3.0 s)',
      'bias': 'Bias',
      'MMI': 'Intensity',
      'mmi': 'Intensity',
      'intensity': 'Intensity'
    },
    'mapInformation': {
        'grid_spacing': 'Grid spacing',
        'grid_points': 'Number of points',
        'grid_span': 'Span',
        'min': 'Min',
        'max': 'Max'
      },
  };

  public abbreviations = {
      'SA(0.3)': 'Spectral acceleration at 0.3 s',
      'SA(1.0)': 'Spectral acceleration at 1.0 s',
      'SA(3.0)': 'Spectral acceleration at 3.0 s',
      'psa03': 'Spectral acceleration at 0.3 s',
      'psa10': 'Spectral acceleration at 1.0 s',
      'psa30': 'Spectral acceleration at 1.0 s',
      'PGA': 'Peak Ground Acceleration',
      'PGV': 'Peak Ground Velocity',
      'pga': 'Percent of Gravitational Acceleration',
      'pgv': 'Peak Ground Velocity'
  };

  public headers: any = {
    'groundMotions': ['type', 'max', 'max_on_land', 'bias'],
    'mapInformation': ['type', 'lat', 'lon']
  };

  constructor (public formatter: FormatterService) { }
  @Input () smOutput: any;

  ngOnInit () {
  }

}
