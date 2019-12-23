import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Text } from '..';

export function MapViewMarker({ description, title, coordinate, ...rest }) {
  const position = [coordinate.latitude, coordinate.longitude];
  return (
    <Marker
      {...rest}
      ref={ref => {
        if (ref) {
          ref.leafletElement.openPopup();
        }
      }}
      position={position}>
      <Popup>
        <Text style={{ fontSize: 18 }}>{title}</Text>
        <br />
        <br />
        {description}
      </Popup>
    </Marker>
  );
}
