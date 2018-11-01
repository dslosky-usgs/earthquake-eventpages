import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Event } from '../event';

@Injectable()
export class WaveformService {
  error: any;
  event$ = new BehaviorSubject<any>(null);
  irisServiceUrl = 'https://service.iris.edu/fdsnws/event/1/query';

  constructor(private httpClient: HttpClient) {}

  getIrisEvent(ev: Event) {
    const options = {
      params: this.getSearchParams(ev),
      responseType: 'text' as 'text'
    };

    this.httpClient.get(this.irisServiceUrl, options).subscribe(response => {
      if (response) {
        this.event$.next(this.parseIrisEventId(response));
      }
    });
  }

  /**
   * Gets search parameters from the model and creates search object
   */
  getSearchParams(ev: Event) {
    let latitude, longitude, search, time;

    search = null;

    if (ev) {
      latitude = ev.geometry.coordinates[1];
      longitude = ev.geometry.coordinates[0];
      time = Number(ev.properties.time);
      // search parameters
      search = {
        endtime: new Date(time + 16000).toISOString().replace('Z', ''),
        format: 'text',
        latitude: latitude,
        longitude: longitude,
        maxradius: '1',
        starttime: new Date(time - 16000).toISOString().replace('Z', '')
      };
    }

    return search;
  }

  /**
   * Gets eventId from data
   * @param {string}
   *    data in string format.
   */
  parseIrisEventId(data) {
    return data.split('\n')[1].split('|')[0];
  }
}
