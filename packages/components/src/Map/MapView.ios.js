import React from 'react';
import { StyleSheet } from 'react-native';
import { default as NativeMapView, MAP_TYPES } from 'react-native-maps';

export function MapView(props) {
  return (
    <NativeMapView
      provider={null}
      mapType={MAP_TYPES.NONE}
      rotateEnabled={false}
      style={styles.map}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
  },
});
