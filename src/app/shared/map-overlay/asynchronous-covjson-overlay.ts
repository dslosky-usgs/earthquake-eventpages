import * as CovJSON from 'covjson-reader';
import * as L from 'leaflet';
import * as C from 'leaflet-coverage';
import { of } from 'rxjs';
/**
 * Class for asynchronous overlays used with the shared-map component.
 *
 * Notable methods subclasses may want to override:
 * - onEachFeature(feature: any, layer: L.Layer)
 *   called by leaflet's GeoJSON layer.
 *
 * - parse(json|string)
 *   parse returned data and return a GeoJSON Feature or FeatureCollection.
 *   default implementation converts strings to json
 *   if returned data is not already json
 *
 * - style(feature)
 *   called by leaflet's GeoJSON layer.
 */
// tslint:disable-next-line:variable-name
const AsynchronousCovJSONOverlay = L.LayerGroup.extend({
  bounds: null,
  // retain layer data to detect whether it's already loaded
  data: null,
  enabled: true,
  // retain url grab errors
  error: Error,
  id: 'async-covjson',
  legends: [],
  // retain  for custom layer adjustments
  map: null,
  title: 'Async CovJSON',
  // url to download geoJSON
  url: null,

  /**
   * Init function
   */
  initialize: function() {
    // for content downloads in async map layers; added to layer during
    // initialization, or manually
    this.httpClient = null;

    L.LayerGroup.prototype.initialize.call(this, []);
  },

  /**
   * Runs after the geoJSON data is successfully added
   */
  afterAdd: function() {
    // subclasses should override this method
  },

  /**
   * Handling all errors
   *
   * @param {Error}
   *
   * @return {Observable}
   *    For caught errors during http requests
   */
  handleError: function(error: any) {
    this.error = error;
    this.data = null;
    return of(null);
  },

  /**
   * Fetch data, and ensure it is parsed into geojson
   */
  loadData: function() {
    if (!this.url) {
      this.data = null;
      return;
    }

    if (this.data !== null) {
      return;
    }

    // flag that data is being loaded
    this.data = 'loading';
    this.layers = [];
    CovJSON.read(this.url).then(cov => {
      this.data = cov;
      const MMI = cov.parameters.get('MMI');

      const layer = C.dataLayer(cov, {
        palette: C.paletteFromObject(MMI.preferredPalette),
        paletteExtent: MMI.preferredPalette.extent,
        parameter: 'MMI'
      });

      this.addLayer(layer);
    });
    /*.catch(error => {
      this.handleError(error);
    });
*/

    this.afterAdd();
  },

  /**
   * Get geoJSON data and add it to the existing layer
   */
  onAdd: function(map) {
    this.map = map;
    L.LayerGroup.prototype.onAdd.call(this, map);

    this.loadData();
    this.afterAdd();
  }
});

export { AsynchronousCovJSONOverlay };
