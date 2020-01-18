import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const statusColors = {
  primary: '#2089dc',
  success: '#52c41a',
  error: '#ff190c',
  warning: '#faad14',
};

export default function Badge(props) {
  const {
    containerStyle,
    textStyle,
    badgeStyle,
    onPress,
    Component = onPress ? TouchableOpacity : View,
    value,
    theme,
    status,
    ...attributes
  } = props;

  const componentStyles = [styles.badge];
  componentStyles.push({ backgroundColor: statusColors[status] });

  return (
    <View style={StyleSheet.flatten([containerStyle && containerStyle])}>
      <Component
        {...attributes}
        style={StyleSheet.flatten([
          styles.badge(theme, status),
          !element && styles.miniBadge,
          badgeStyle && badgeStyle,
        ])}
        onPress={onPress}>
        {element}
      </Component>
    </View>
  );
}

Badge.propTypes = {
  containerStyle: View.propTypes.style,
  badgeStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
  value: PropTypes.node,
  onPress: PropTypes.func,
  Component: PropTypes.elementType,
  theme: PropTypes.object,
  status: PropTypes.oneOf(['primary', 'success', 'warning', 'error']),
};

Badge.defaultProps = {
  status: 'primary',
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'center',
    minWidth: 18,
    height: 18,
    borderRadius: 18 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
  },
  miniBadge: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: 8,
    height: 8,
    borderRadius: 8 / 2,
  },
  text: {
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 4,
  },
});
