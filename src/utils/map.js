import LayerVector from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import SourceVector from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { buffer } from 'ol/extent';

export const addLayerToMap = (map, layer) => {
  if (!layer) return;
  map.addLayer(layer);
};

export const createLayer = (layerName) => {
  const vectorLayer = new LayerVector({});
  vectorLayer.setProperties({ layerName });

  return vectorLayer;
};

export const createPointFeature = (coordinates, nameOfMap) => {
  const feature = new Feature({
    geometry: new Point(fromLonLat(coordinates)),
    name: 'My Polygon',
  });
  if (nameOfMap) feature.setId(`featureOfMap${nameOfMap}`);

  //   const style = new Style({
  //     //   image: new Style.Icon({
  //     //     src: 'http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png',
  //     //     scale: 0.25,
  //     //   }),
  //     stroke: new Stroke({
  //       color: '#5E8D74',
  //       width: 3,
  //     }),
  //   }),

  return feature;
};

export const addFeaturesToLayer = (layer, features) => {
  if (!layer || !features) return;
  if (layer.getSource()) layer.getSource().addFeatures(features);
  else {
    const vectorSource = new SourceVector({
      features,
    });
    layer.setSource(vectorSource);
  }
};

export const zoomToFeatureWithBuffer = (map, feature, eBuffer = 7000) => {
  if (!feature) return;

  const extent = feature?.getGeometry()?.getExtent();
  if (extent) {
    const extentWithBuffor = buffer(extent, eBuffer);
    map.getView().fit(extentWithBuffor, {
      duration: 500,
      easeIn: 'easIn',
    });
  }
};
