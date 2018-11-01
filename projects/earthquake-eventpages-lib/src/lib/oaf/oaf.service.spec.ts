import { TestBed, inject } from '@angular/core/testing';

import { OafService } from './oaf.service';

describe('OafService', () => {
  const MODEL = {
    name: 'modelName',
    parameters: {
      paramOne: 'valueOne',
      paramTwo: 'valueTwo'
    },
    ref: 'modelRef'
  };

  const OAF = {
    forecast: [],
    model: MODEL
  };

  const PRODUCT = {
    contents: { '': { bytes: JSON.stringify(OAF) } }
  };

  const FORECAST = [
    {
      aboveMainshockMag: {
        magnitude: 1,
        probability: 1
      },
      bins: [
        {
          magnitude: 1,
          p95maximum: 2,
          p95minimum: 0,
          probability: 0.5
        }
      ],
      label: '1 Day',
      timeEnd: 10,
      timeStart: 5
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OafService]
    });
  });

  it('should be created', inject([OafService], (service: OafService) => {
    expect(service).toBeTruthy();
  }));

  describe('getOaf', () => {
    it('should tick next of null on errors', inject(
      [OafService],
      (service: OafService) => {
        const subscription = service.oaf$.subscribe(value => {
          expect(value).toBe(null);
        });
        subscription.add(
          service.model$.subscribe(value => {
            expect(value).toBe(null);
          })
        );

        service.getOaf(null);
        service.getOaf('');
        service.getOaf('{"foo": bar}');
        service.getOaf(
          JSON.stringify({
            contents: {
              '': {
                bytes: '{"foo": bar,}' // <-- Intentional syntax error
              }
            }
          })
        );

        subscription.unsubscribe();
      }
    ));
  });

  it('should notify with objects on success', inject(
    [OafService],
    (service: OafService) => {
      let triggered = false;

      const parseOafSpy = spyOn(service, 'parseOaf').and.callThrough();
      const parseModelSpy = spyOn(service, 'parseModel').and.callThrough();
      const parseForecast = spyOn(service, 'parseForecast').and.callThrough();

      const subscription = service.oaf$.subscribe(value => {
        if (triggered) {
          expect(value).not.toEqual(null);
          expect(parseOafSpy).toHaveBeenCalledWith(JSON.stringify(OAF));
        }
      });

      subscription.add(
        service.model$.subscribe(value => {
          if (triggered) {
            expect(value).not.toEqual(null);
            expect(parseModelSpy).toHaveBeenCalledWith(MODEL);
          }
        })
      );

      subscription.add(
        service.forecast$.subscribe(value => {
          if (triggered) {
            expect(value).not.toEqual(null);
            expect(parseForecast).toHaveBeenCalledWith(OAF.forecast);
          }
        })
      );

      triggered = true;
      service.getOaf(PRODUCT);

      subscription.unsubscribe();
    }
  ));

  describe('parseModel', () => {
    it('parses correctly', inject([OafService], (service: OafService) => {
      expect(service.parseModel(MODEL)).toEqual({
        name: MODEL.name,
        parameters: {
          keys: Object.keys(MODEL.parameters),
          values: MODEL.parameters
        },
        ref: MODEL.ref
      });
    }));
  });

  describe('parseOaf', () => {
    it('defers to JSON.parse', inject([OafService], (service: OafService) => {
      const jsonSpy = spyOn(JSON, 'parse');
      service.parseOaf('');
      expect(jsonSpy).toHaveBeenCalledWith('');
    }));
  });

  describe('parseForecast', () => {
    it('parses forecast correctly', inject(
      [OafService],
      (service: OafService) => {
        const forecastOutput = {
          columnIds: ['magnitude', '1_Day'],
          columns: [
            {
              id: '1_Day',
              label: '1 Day',
              timeEnd: 10,
              timeStart: 5
            }
          ],
          rows: [
            {
              data: {
                '1_Day': {
                  magnitude: 1,
                  p95maximum: 2,
                  p95minimum: 0,
                  probability: 0.5
                }
              },
              magnitude: 1
            }
          ]
        };
        expect(service.parseForecast(FORECAST)).toEqual(forecastOutput);
      }
    ));
  });
});
