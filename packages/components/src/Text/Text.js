import React from 'react';
import PropTypes from 'prop-types';
import { Text as ReactNativeText, StyleSheet, Platform } from 'react-native';

export default function Text({
  style,
  children,
  h1,
  h2,
  h3,
  h4,
  h1Style,
  h2Style,
  h3Style,
  h4Style,
  ...rest
}) {
  return (
    <ReactNativeText
      style={StyleSheet.flatten([
        styles.text,
        style && style,
        h1 && styles.bold,
        h2 && styles.bold,
        h3 && styles.bold,
        h4 && styles.bold,
        h1 && StyleSheet.flatten([{ fontSize: 40 }, h1Style]),
        h2 && StyleSheet.flatten([{ fontSize: 34 }, h2Style]),
        h3 && StyleSheet.flatten([{ fontSize: 28 }, h3Style]),
        h4 && StyleSheet.flatten([{ fontSize: 22 }, h4Style]),
      ])}
      {...rest}>
      {children}
    </ReactNativeText>
  );
}

Text.propTypes = {
  style: ReactNativeText.propTypes.style,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h1Style: ReactNativeText.propTypes.style,
  h2Style: ReactNativeText.propTypes.style,
  h3Style: ReactNativeText.propTypes.style,
  h4Style: ReactNativeText.propTypes.style,
  children: PropTypes.node,
};

Text.defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  style: {},
  h1Style: {},
  h2Style: {},
  h3Style: {},
  h4Style: {},
  children: '',
};

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      android: {
        fontWeight: '400',
      },
    }),
  },
  bold: {
    ...Platform.select({
      android: {
        fontWeight: '500',
      },
    }),
  },
});
