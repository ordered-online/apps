import React from 'react';
import { TileLayer } from 'react-leaflet';

export function MapViewTile({ urlTemplate, ...rest }) {
  return (
    <TileLayer
      {...rest}
      url={urlTemplate}
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      style={{ height: '100%' }}
    />
  );
}
