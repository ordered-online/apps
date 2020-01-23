import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';

import Text from '../Text';

const statusColors = {
  primary: '#57c75e',
  success: '#52c41a',
  error: '#ff190c',
  warning: '#faad14',
};

export default function Badge(props) {
  const {
    containerStyle,
    badgeStyle,
    onPress,
    Component = onPress ? TouchableOpacity : View,
    value,
    status,
    ...attributes
  } = props;

  const componentStyles = [styles.badge];
  componentStyles.push({ backgroundColor: statusColors[status] });

  const element = value ? (
    <Text style={{ color: '#fff', fontWeight: '500' }}>{value}</Text>
  ) : null;

  return (
    <View style={StyleSheet.flatten([containerStyle && containerStyle])}>
      <Component
        {...attributes}
        style={StyleSheet.flatten([
          componentStyles,
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
  containerStyle: ViewPropTypes.style,
  badgeStyle: ViewPropTypes.style,
  value: PropTypes.node,
  onPress: PropTypes.func,
  Component: PropTypes.elementType,
  status: PropTypes.oneOf(['primary', 'success', 'warning', 'error']),
};

Badge.defaultProps = {
  status: 'primary',
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'center',
    minWidth: 25,
    height: 25,
    borderRadius: 50,
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
});
