import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';

/**
 * Shakemaop intensity overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const ShakemapIntensityOverlay = AsynchronousGeoJSONOverlay.extend({
  id: 'shakemap-intensity',
  legends: [],
  title: 'Shakemap MMI Contours',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     shakemap product
   */
  initialize: function(product: any) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    const intensityLegend = document.createElement('img');
    intensityLegend.src = './assets/shakemap-intensity-legend-small.png';
    intensityLegend.setAttribute('alt', 'Intensity Scale legend');

    const contourLegend = document.createElement('img');
    contourLegend.src = './assets/legend-intensity-contour.png';
    contourLegend.setAttribute('alt', 'Intensity Contour Legend');

    // Add to legends array
    this.legends.push(intensityLegend, contourLegend);

    this.url = this.getUrl(product);
  },

  /**
   * Returns the cont_mi url from the product, if exists
   *
   * @param product
   *     shakemap product
   */
  getUrl: function(product: any) {
    if (product === null) {
      return null;
    }

    return product.contents['download/cont_mi.json']
      ? product.contents['download/cont_mi.json'].url
      : null;
  },

  /**
   * Binds popups the the feature layer
   *
   * @param feature
   *     The feature from this product
   * @param layer
   *     The leaflet layer
   */
  onEachFeature: function(feature: any, layer: any) {
    if (feature.properties) {
      layer.bindPopup(`<abbr title="Modified Mercalli Intensity">MMI</abbr>
      ${feature.properties.value}`);
    }
  },

  /**
   * Sets and returns a default line style
   *
   * @param feature
   *     The feature from this product
   */
  style: function(feature: any) {
    // set default line style
    const lineStyle = {
      color: feature.properties.color,
      opacity: 1,
      weight: feature.properties.weight
    };

    return lineStyle;
  }
});

export { ShakemapIntensityOverlay };
