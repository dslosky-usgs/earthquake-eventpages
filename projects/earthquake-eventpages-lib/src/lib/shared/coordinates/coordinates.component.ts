import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FormatterService } from '@core/formatter.service';


/**
 * Shared coordinates component, simple coordinates to get/set for use in
 * shared components
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-coordinates',
  styleUrls: ['./coordinates.component.scss'],
  templateUrl: './coordinates.component.html'
})
export class CoordinatesComponent {
  _latitude: number;
  _longitude: number;

  constructor(public formatter: FormatterService) {}

  /**
   * Setter for latitude property
   * @param value
   *     The latitude value
   */
  @Input()
  set latitude(value: any) {
    this._latitude = parseFloat(value);
  }

  /**
   * Getter for latitude property
   * @returns {number}
   */
  get latitude() {
    return this._latitude;
  }

  /**
   * Setter for longitude property
   * @param value
   *     The longitude value
   */
  @Input()
  set longitude(value: any) {
    this._longitude = parseFloat(value);
  }

  /**
   * Getter for longitude property
   * @returns {number}
   */
  get longitude() {
    return this._longitude;
  }
}
