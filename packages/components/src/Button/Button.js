import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';

export default function Button(props) {
  const {
    accessibilityLabel,
    color,
    type,
    raised,
    disabled,
    onPress,
    touchSoundDisabled,
    title,
    hasTVPreferredFocus,
    nextFocusDown,
    nextFocusForward,
    nextFocusLeft,
    nextFocusRight,
    nextFocusUp,
    titleStyle,
    titleProps,
    loading,
    loadingStyle,
    loadingProps,
    testID,
  } = props;

  const buttonStyles = [styles.button];
  const textStyles = [styles.text, titleStyle];

  if (color) {
    buttonStyles.push({ backgroundColor: color });
  }

  switch (type) {
    case 'solid':
      break;
    case 'outline':
      buttonStyles.push(styles.outline);
      textStyles.push(styles.textPrimary);
      break;
    case 'clear':
      buttonStyles.push(styles.clear);
      textStyles.push(styles.textPrimary);
      break;
    default:
      break;
  }

  if (raised) {
    buttonStyles.push(styles.raised);
  }

  const accessibilityState = {};
  if (disabled) {
    buttonStyles.push(styles.buttonDisabled);
    textStyles.push(styles.textDisabled);
    accessibilityState.disabled = true;
  }

  if (typeof title !== 'string') {
    console.error('The title prop of a Button must be a string');
  }

  const formattedTitle =
    Platform.OS === 'android' ? title.toUpperCase() : title;
  const Touchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Touchable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      hasTVPreferredFocus={hasTVPreferredFocus}
      nextFocusDown={nextFocusDown}
      nextFocusForward={nextFocusForward}
      nextFocusLeft={nextFocusLeft}
      nextFocusRight={nextFocusRight}
      nextFocusUp={nextFocusUp}
      testID={testID}
      disabled={disabled}
      onPress={onPress}
      touchSoundDisabled={touchSoundDisabled}>
      <View style={buttonStyles}>
        {loading && (
          <ActivityIndicator
            style={StyleSheet.flatten([styles.loading, loadingStyle])}
            color="white"
            {...loadingProps}
          />
        )}

        {!loading && !!title && (
          <Text style={textStyles} {...titleProps} disabled={disabled}>
            {formattedTitle}
          </Text>
        )}
      </View>
    </Touchable>
  );
}

Button.propTypes = {
  accessibilityLabel: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  raised: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  touchSoundDisabled: PropTypes.bool,
  title: PropTypes.string,
  hasTVPreferredFocus: PropTypes.bool,
  nextFocusDown: PropTypes.number,
  nextFocusForward: PropTypes.number,
  nextFocusLeft: PropTypes.number,
  nextFocusRight: PropTypes.number,
  nextFocusUp: PropTypes.number,
  titleStyle: PropTypes.object,
  titleProps: PropTypes.object,
  loading: PropTypes.bool,
  loadingStyle: ViewPropTypes.style,
  loadingProps: PropTypes.object,
  testID: PropTypes.string,
};

Button.defaultProps = {
  title: '',
  onPress: () => console.log('Please attach a method to this component'),
  type: 'solid',
  disabled: false,
  raised: false,
  loading: false,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#57c75e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    padding: 12,
    marginVertical: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
  },
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    },
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd',
    },
    android: {
      color: '#a1a1a1',
    },
  }),
  outline: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#57c75e',
  },
  clear: {
    backgroundColor: 'transparent',
  },
  textPrimary: {
    color: '#57c75e',
  },
  raised: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 0.5,
  },
  loading: {
    marginVertical: 2,
  },
});
