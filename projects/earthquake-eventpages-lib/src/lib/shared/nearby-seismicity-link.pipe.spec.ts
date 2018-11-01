import { Event } from '../event';
import { NearbySeismicityLinkPipe } from './nearby-seismicity-link.pipe';

describe('NearbySeismicityLinkPipe', () => {
  let pipe: NearbySeismicityLinkPipe;
  let event: Event;

  beforeEach(() => {
    pipe = new NearbySeismicityLinkPipe();
    event = new Event({
      geometry: {
        coordinates: [94.3299, -4.9521]
      },
      id: 'us10004u1y'
    });
  });

  afterEach(() => {
    pipe = null;
    event = null;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null when no event is found', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('returns null when event geometry property is null', () => {
    event.geometry = null;
    expect(pipe.transform(event)).toBeNull();
  });

  it('returns null when event id property is null', () => {
    event.id = null;
    expect(pipe.transform(event)).toBeNull();
  });

  describe('getNearbySeismicityLink', () => {
    it('guards against null/bad event parameter', () => {
      expect(pipe.getNearbySeismicityLink(null)).toEqual(null);
      expect(pipe.getNearbySeismicityLink(new Event({}))).toEqual(null);
      expect(
        pipe.getNearbySeismicityLink(new Event({ geometry: true }))
      ).toEqual(null);
    });

    it('calls proper sub-methods', () => {
      const leqSpy = spyOn(pipe, 'getLatestEarthquakesLink').and.returnValue(
        ''
      );
      const nspSpy = spyOn(pipe, 'getNearbySeismicityParams').and.returnValue(
        {}
      );
      event = null;
      event = new Event({ geometry: {}, id: 'eventid' });

      pipe.getNearbySeismicityLink(event);
      expect(leqSpy).toHaveBeenCalled();
      expect(leqSpy).toHaveBeenCalledWith('eventid', {});

      expect(nspSpy).toHaveBeenCalled();
      expect(nspSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('getLatestEarthquakesLink', () => {
    let mapPositionSpy;

    beforeEach(() => {
      mapPositionSpy = spyOn(pipe, 'getMapPosition').and.returnValue({});
    });

    const parseSettings = function(linkHref: string) {
      const parts = linkHref.split('#');
      const settings = JSON.parse(decodeURIComponent(parts[1]));

      return settings;
    };

    it('uses current map position', () => {
      const params = {};
      const linkHref = pipe.getLatestEarthquakesLink('eventid', params);
      const settings = parseSettings(linkHref);

      expect(mapPositionSpy).toHaveBeenCalled();
      expect(mapPositionSpy).toHaveBeenCalledWith(params);
      expect(settings.feed).toEqual('eventid');
    });

    it('works without parameters', () => {
      const linkHref = pipe.getLatestEarthquakesLink();
      const settings = parseSettings(linkHref);

      expect(Math.abs(settings.feed - new Date().getTime())).toBeLessThan(1000);
      expect(settings.mapposition).toEqual({});
    });
  });

  describe('getMapPosition', () => {
    it('uses defaults without params', () => {
      const mapPosition = pipe.getMapPosition();
      expect(mapPosition).toEqual([[-85, -180], [85, 180]]);
    });

    it('uses provided rectangle parameters parameters', () => {
      const mapPosition = pipe.getMapPosition({
        maxlatitude: 3,
        maxlongitude: 4,
        minlatitude: -1,
        minlongitude: -2
      });
      expect(mapPosition).toEqual([[-1, -2], [3, 4]]);
    });

    it('uses circle parameters', () => {
      const mapPosition = pipe.getMapPosition({
        latitude: 0,
        longitude: 0,
        maxradiuskm: 0
      });
      expect(mapPosition).toEqual([[0, 0], [0, 0]]);
    });
  });

  describe('getNearbySeismicityParams', () => {
    it('returns expected results', () => {
      event = null;
      event = new Event({
        geometry: { coordinates: [1, 2, 3] },
        properties: { time: 0, mag: 5 }
      });
      const result = pipe.getNearbySeismicityParams(event);

      expect(result).toEqual({
        endtime: '1970-01-22T00:00:00.000Z',
        latitude: 2,
        longitude: 1,
        maxradiuskm: 250,
        minmagnitude: 2,
        starttime: '1969-12-11T00:00:00.000Z'
      });
    });

    it('uses default when mag is null', () => {
      event = null;
      event = new Event({
        geometry: { coordinates: [1, 2, 3] },
        properties: { time: 0, mag: null }
      });
      const result = pipe.getNearbySeismicityParams(event);

      expect(result).toEqual({
        endtime: '1970-01-22T00:00:00.000Z',
        latitude: 2,
        longitude: 1,
        maxradiuskm: 250,
        minmagnitude: 1,
        starttime: '1969-12-11T00:00:00.000Z'
      });
    });

    it('short circuits on bad event information', () => {
      // No longitude
      event = null;
      event = new Event({
        geometry: { coordinates: [null, 2, 3] },
        properties: { time: 0, mag: 5 }
      });
      let result = pipe.getNearbySeismicityParams(event);
      expect(result).toBe(false);

      // No latitude
      event = new Event({
        geometry: { coordinates: [1, null, 3] },
        properties: { time: 0, mag: 5 }
      });
      result = pipe.getNearbySeismicityParams(event);
      expect(result).toBe(false);

      // No time
      event = new Event({
        geometry: { coordinates: [1, 2, 3] },
        properties: { time: null, mag: 5 }
      });
      result = pipe.getNearbySeismicityParams(event);
      expect(result).toBe(false);
    });
  });
});
