import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

const mapStyles = `width: 100%; height: 300;`;

const initialRegion = {
  latitude: 51.0250869,
  longitude: 13.7210005,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Map({ region, marker }) {
  const webview = useRef();

  //   const _region = region || initialRegion;
  //   const position = [_region.latitude, _region.longitude];

  //   const zoom = marker ? 16 : 10;

  // const { description = {}, title, coordinate } = marker;
  // const markerPosition = [coordinate.latitude, coordinate.longitude];

  const html = `
  <html lang="%LANG_ISO_CODE%">
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"/>
      <style> #map { ${mapStyles} } </style>
    </head>

    <body>

      <div id="map"></div>

      <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>

    </body>
  </html>
  `;

  const javaScript = `
  `;
  // var osm_map = L.map('map').setView([${position[0]}, ${position[1]}], ${zoom});
  // var marker = L.marker([${markerPosition[0]}, ${markerPosition[1]}]).addTo(osm_map);
  // marker.bindPopup("<p style="font-size:18px">${title}</b><br><br>${description}").openPopup();

  return (
    <WebView
      // ref={webview}
      originWhitelist={['*']}
      source={{ html }}
      style={{ marginTop: 20 }}
      allowUniversalAccessFromFileURLs={true}
    />
  );
}

Map.defaultProps = {
  region: initialRegion,
  marker: {
    title: '',
    description: '',
    coordinate: {
      latitude: 51.0250869,
      longitude: 13.7210005,
    },
  },
};

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
