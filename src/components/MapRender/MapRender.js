import React from 'react';
import * as olInteraction from 'ol/interaction';
import * as proj from 'ol/proj';
import PropTypes from 'prop-types';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Card from '@material-ui/core/Card';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Text from 'ol/style/Text';
import { fromLonLat } from 'ol/proj';
import { useStyles } from './MapRenderUseStyles.js';
import {
  addLayerToMap,
  createLayer,
  createPointFeature,
  addFeaturesToLayer,
  zoomToFeatureWithBuffer,
} from '../../utils/map';
import { mapNames, homeIconSrc } from '../../consts/main.js';
import { searchColors, featureFont } from '../../consts/styles.js';

const MapRender = (props) => {
  const classes = useStyles();
  const { nameOfMap, searchedItem } = props;
  const userLocationLayer = React.useRef(null);
  const [map, setMap] = React.useState({});

  React.useEffect(() => {
    createMap();
  }, []);

  React.useEffect(() => {
    if (Object.keys(map).length) {
      userLocationLayer.current = createLayer('userLocationLayer');
      addLayerToMap(map, userLocationLayer.current);
    }
  }, [map]);

  const handleSetStyle = (feature, searchData) => {
    if (feature)
      feature.setStyle(
        new Style({
          image:
            nameOfMap === mapNames.homeMap
              ? new Icon({
                  src: homeIconSrc,
                  scale: 0.05,
                })
              : new Circle({
                  radius: 5,
                  fill: new Fill({ color: searchColors.fill }),
                  stroke: new Stroke({ color: searchColors.stroke, width: 1 }),
                }),
          text: new Text({
            text:
              nameOfMap === mapNames.searchMap
                ? `${searchData?.ip} ${searchData?.region_name}`
                : 'I am here',
            offsetY: 20,
            font: featureFont,
          }),
        })
      );
  };

  const handleCreateFeatureAndZoom = (searchData) => {
    const newFeature = createPointFeature(
      [searchData.longitude, searchData.latitude],
      nameOfMap
    );
    handleSetStyle(newFeature, searchData);
    addFeaturesToLayer(userLocationLayer.current, [newFeature]);
    zoomToFeatureWithBuffer(map, newFeature);
  };

  React.useEffect(() => {
    if (Object.keys(searchedItem).length && nameOfMap === mapNames.homeMap) {
      if (Object.keys(map).length) {
        handleCreateFeatureAndZoom(searchedItem);
      }
    }
    if (Object.keys(searchedItem).length && nameOfMap === mapNames.searchMap) {
      if (Object.keys(map).length) {
        const isFeatureRendered = userLocationLayer.current
          ?.getSource()
          ?.getFeatureById(`featureOfMap${nameOfMap}`);
        if (isFeatureRendered) {
          handleChangeFeatureGeometryAndZoom(isFeatureRendered);
        } else {
          handleCreateFeatureAndZoom(searchedItem);
        }
      }
    }
  }, [searchedItem, map]);

  const handleChangeFeatureGeometryAndZoom = (isFeatureRendered) => {
    isFeatureRendered
      .getGeometry()
      .setCoordinates(
        fromLonLat([searchedItem.longitude, searchedItem.latitude])
      );
    handleSetStyle(isFeatureRendered, searchedItem);
    zoomToFeatureWithBuffer(map, isFeatureRendered);
  };

  const createMap = () => {
    const renderedMap = new Map({
      target: `map${nameOfMap}`,
      view: new View({
        center: proj.fromLonLat([19.015839, 52.2307]),
        zoom: 6,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      interactions: olInteraction.defaults({ doubleClickZoom: false }),
    });
    setMap(renderedMap);

    return renderedMap;
  };

  return (
    <Card className={classes.MapRenderWrapper}>
      <div className={classes.MapRender} id={`map${nameOfMap}`} />
    </Card>
  );
};

MapRender.propTypes = {
  nameOfMap: PropTypes.string.isRequired,
  searchedItem: PropTypes.object,
};

export default MapRender;
