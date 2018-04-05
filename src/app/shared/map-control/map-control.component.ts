declare function require(string): string;

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Overlay } from '../map-overlay/overlay';

@Component({
  selector: 'shared-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.scss']
})
export class MapControlComponent implements OnInit {

  // get image for layers from leaflet images
  public layersImg: any = require('leaflet/dist/images/layers.png');

  // value of overlays property
  public _overlays: Array<Overlay> = [];
  public controlCollapsed = true;
  public legendCollapsed = true;

  // hold image urls for legend
  public legend: string[] = [];

  constructor() { }
  @Input() set overlays (overlays: Array<Overlay>) {
    this._overlays = overlays;

    this.updateLegend();
  }

  get overlays (): Array<Overlay> {
    return this._overlays;
  }

  // emit an event when the selected layers has changed
  @Output() overlayChange: EventEmitter<any> = new EventEmitter();
  changeOverlays() {
    this.overlayChange.emit(this._overlays);
  }

  ngOnInit() {
  }

  toggleLegend() {
    if (this.legendCollapsed &&
        (this.legend.length > 0)) {
      this.legendCollapsed = false;
    } else {
      this.legendCollapsed = true;
    }
  }

  toggleOverlay(overlay) {
    overlay.enabled = !overlay.enabled;
    this.updateLegend();
    this.changeOverlays();
  }

  updateLegend() {
    this.legend = [];
    for (const overlay of this._overlays) {
      if (overlay.enabled &&
          overlay.legend) {

        if (this.legend.indexOf(overlay.legend) < 0) {
          this.legend.push(overlay.legend);
        }

      }
    }

    if (this.legend.length === 0) {
      this.legendCollapsed = true;
    }
  }

}
