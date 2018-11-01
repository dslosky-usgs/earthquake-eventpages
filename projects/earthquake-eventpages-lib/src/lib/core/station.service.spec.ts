import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, getTestBed, inject } from '@angular/core/testing';

import { StationService } from './station.service';

describe('StationService', () => {
  let httpClient, injector;

  // Sample product to process
  const PRODUCT = {
    contents: {
      'download/stationlist.json': { url: 'url' }
    }
  };

  // sample stations to process
  const STATIONS_JSON = {
    features: [
      {
        channels: [],
        properties: {
          channels: [
            {
              amplitudes: [{ name: 'pga', value: 1 }],
              name: 'channel'
            }
          ],
          pga: 5.2
        },
        type: 'feature'
      }
    ],
    type: 'FeatureCollection'
  };

  const OLD_STATIONS_JSON = {
    features: [
      {
        channels: [],
        properties: {
          channels: [
            {
              amplitudes: [{ name: 'sa(1.0)', value: 1 }],
              name: 'channel'
            }
          ],
          pga: 'null',
          pgv: 'nan'
        },
        type: 'feature'
      }
    ],
    type: 'FeatureCollection'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StationService]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  it('should be created', inject(
    [StationService],
    (service: StationService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('getMetadata', () => {
    it('handles success', inject(
      [StationService],
      (service: StationService) => {
        const response = '';

        expect(() => {
          service.getStations(PRODUCT);
          const request = httpClient.expectOne('url');
          request.flush(response);
        }).not.toThrowError();
      }
    ));

    it('handles failure', inject(
      [StationService],
      (service: StationService) => {
        service.getStations(PRODUCT);
        const request = httpClient.expectOne('url');
        request.flush('', { status: 500, statusText: 'Error' });

        service.stationsJson$.subscribe(content => {
          expect(content).toEqual(null);
          expect(service.error).toBeTruthy();
        });
      }
    ));

    it('handles parse failure', inject(
      [StationService],
      (service: StationService) => {
        spyOn(service, 'onStations').and.throwError('test error');

        service.getStations(PRODUCT);
        const request = httpClient.expectOne('url');
        request.flush('', { status: 500, statusText: 'Error' });

        service.stationsJson$.subscribe(content => {
          expect(content).toEqual(null);
          expect(service.error).toEqual(new Error('test error'));
        });
      }
    ));

    it('handles null input', inject(
      [StationService],
      (service: StationService) => {
        service.getStations(null);

        service.stationsJson$.subscribe(content => {
          expect(content).toEqual(null);
        });
      }
    ));
  });

  describe('onStations', () => {
    it('handles parse success', inject(
      [StationService],
      (service: StationService) => {
        service.onStations(STATIONS_JSON);

        service.stationsJson$.subscribe(content => {
          expect(content).toEqual(STATIONS_JSON);
        });
      }
    ));

    it('handles old json', inject(
      [StationService],
      (service: StationService) => {
        service.onStations(OLD_STATIONS_JSON);

        service.stationsJson$.subscribe(content => {
          expect(content.features[0].properties.pga).toEqual(null);
          expect(content.features[0].properties.pgv).toEqual(null);
        });
      }
    ));
  });

  describe('translateAmps', () => {
    it('handles parse success', inject(
      [StationService],
      (service: StationService) => {
        let station = STATIONS_JSON.features[0];
        station = service.translateAmps(station);

        expect(station.channels[0].pga.value).toEqual(1);
      }
    ));

    it('handles sa(1.0) style headers', inject(
      [StationService],
      (service: StationService) => {
        let station = OLD_STATIONS_JSON.features[0];
        station = service.translateAmps(station);

        expect(station.channels[0].psa10.value).toEqual(1);
      }
    ));
  });
});
