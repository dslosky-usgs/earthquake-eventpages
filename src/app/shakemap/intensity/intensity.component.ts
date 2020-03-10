import { Component } from '@angular/core';

import { EventService } from '@core/event.service';

/**
 * Intensity map showed when user selects the intensity tab from main shakemap
 */
@Component({
  selector: 'shakemap-intensity',
  styleUrls: [
    './intensity.component.scss',
    '../shakemap/shakemap.component.scss'
  ],
  templateUrl: './intensity.component.html'
})
export class IntensityComponent {
  contourOverlays = ['shakemap-mmi-contours','shakemap-stations'];
  formats = ['png', 'jpg', 'pdf'];
  imageOverlays = ['shakemap-coverage','shakemap-stations'];
  overlays = this.imageOverlays;

  constructor(public eventService: EventService) {}
}
