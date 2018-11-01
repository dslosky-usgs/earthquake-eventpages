import { Pipe, PipeTransform } from '@angular/core';
import { ParamMap } from '@angular/router';

@Pipe({
  name: 'interactiveMapBounds'
})
export class InteractiveMapBoundsPipe implements PipeTransform {
  /**
   * Returns the leaflet map bounds
   *
   * @param params
   *     query string parameters
   *
   * @return {any}
   *     leaflet map bounds
   */
  transform(params: ParamMap): any {
    if (!params) {
      return null;
    }

    const parsed = [];
    const bounds = params.getAll('bounds');
    bounds.forEach(b => {
      if (!b) {
        return;
      }
      parsed.push(b.split(',').map(n => +n));
    });

    if (parsed.length === 0) {
      return null;
    }
    return parsed;
  }
}
