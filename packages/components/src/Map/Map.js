import React from 'react';
import PropTypes from 'prop-types';
import { MapView } from './MapView';
import { MapViewTile } from './MapViewTile';
import { MapViewMarker } from './MapViewMarker';

import { MAP_TYPES } from 'react-native-maps';

export default function Map({ region, marker }) {
  const initialRegion = {
    latitude: 51.0250869,
    longitude: 13.7210005,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView
      region={region || initialRegion}
      zoom={marker ? 16 : 10}
      provider={null}
      mapType={MAP_TYPES.NONE}
      showsUserLocation>
      <MapViewTile urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {marker && (
        <MapViewMarker
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      )}
    </MapView>
  );
}

Map.propTypes = {
  region: PropTypes.shape({
    /**
     * Coordinates for the center of the map.
     */
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,

    /**
     * Difference between the minimun and the maximum latitude/longitude
     * to be displayed.
     */
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }),
  marker: PropTypes.shape({
    /**
     * The title of the marker. This is only used if the <Marker /> component has no children that
     * are a `<Callout />`, in which case the default callout behavior will be used, which
     * will show both the `title` and the `description`, if provided.
     */
    title: PropTypes.string,

    /**
     * The description of the marker. This is only used if the <Marker /> component has no children
     * that are a `<Callout />`, in which case the default callout behavior will be used,
     * which will show both the `title` and the `description`, if provided.
     */
    description: PropTypes.string,

    /**
     * Coordinates for the anchor point of the marker.
     */
    coordinate: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  }),
};
