import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Map } from 'react-leaflet';

const mapStyles = { width: Dimensions.get('window').width, height: 400 };

export function MapView({ region, style, children, zoom }) {
  const position = [region.latitude, region.longitude];
  return (
    <View style={style}>
      <Map center={position} zoom={zoom} style={mapStyles}>
        {children}
      </Map>
    </View>
  );
}
