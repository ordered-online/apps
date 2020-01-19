import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Switch,
  TouchableHighlight,
  View,
  ViewPropTypes,
} from 'react-native';

import Badge from '../Badge';
import Input from '../Input';
import Text from '../Text';

const PadView = forwardRef((props, ref) => {
  const _root = useRef();

  const setNativeProps = nativeProps =>
    _root.current.setNativeProps(nativeProps);

  useImperativeHandle(ref, () => ({
    setNativeProps,
  }));

  const { children, pad, Component, ...rest } = props;
  const childrens = React.Children.toArray(children);
  const { length } = childrens;
  const Container = Component || View;

  return (
    <Container {...rest} ref={_root}>
      {React.Children.map(
        childrens,
        (child, index) =>
          child && [child, index !== length - 1 && <View width={pad} />]
      )}
    </Container>
  );
});

PadView.propTypes = {
  children: PropTypes.node,
  pad: PropTypes.number,
  Component: PropTypes.elementType,
};

export default function ListItem(props) {
  const {
    title,
    titleStyle,
    titleProps,
    subtitle,
    subtitleStyle,
    subtitleProps,
    containerStyle,
    onPress,
    onLongPress,
    Component = onPress || onLongPress ? TouchableHighlight : View,
    leftElement,
    rightElement,
    rightTitle,
    rightTitleStyle,
    rightTitleProps,
    rightSubtitle,
    rightSubtitleStyle,
    rightSubtitleProps,
    input,
    switch: switchProps, // switch is a reserved keyword
    badge,
    chevron,
    contentContainerStyle,
    rightContentContainerStyle,
    checkmark,
    disabled,
    disabledStyle,
    bottomDivider,
    topDivider,
    pad,
    linearGradientProps,
    ViewComponent = linearGradientProps && global.Expo
      ? global.Expo.LinearGradient
      : View,
    ...attributes
  } = props;

  return (
    <Component
      {...attributes}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}>
      <PadView
        Component={ViewComponent}
        {...linearGradientProps}
        style={StyleSheet.flatten([
          styles.container,
          switchProps && { paddingVertical: 8 },
          topDivider && { borderTopWidth: StyleSheet.hairlineWidth },
          bottomDivider && { borderBottomWidth: StyleSheet.hairlineWidth },
          containerStyle,
          disabled && disabledStyle,
        ])}
        pad={pad}>
        <Text>{leftElement}</Text>

        {(typeof title !== 'undefined' || subtitle) && (
          <View
            style={StyleSheet.flatten([
              styles.contentContainer,
              contentContainerStyle,
            ])}>
            <Text
              style={[styles.title, titleStyle]}
              testID="listItemTitle"
              {...titleProps}>
              {title}
            </Text>
            <Text
              style={[styles.subtitle, subtitleStyle]}
              testID="listItemSubTitle"
              {...subtitleProps}>
              {subtitle}
            </Text>
          </View>
        )}

        {(!!rightTitle || !!rightSubtitle) && (
          <View
            style={StyleSheet.flatten([
              styles.rightContentContainer,
              rightContentContainerStyle,
            ])}>
            <Text
              style={[styles.title, styles.rightTitle, rightTitleStyle]}
              {...rightTitleProps}>
              {rightTitle}
            </Text>
            <Text
              style={[
                styles.subtitle,
                styles.rightSubtitle,
                rightSubtitleStyle,
              ]}
              {...rightSubtitleProps}>
              {rightSubtitle}
            </Text>
          </View>
        )}

        {input && (
          <Input
            {...input}
            inputStyle={StyleSheet.flatten([
              styles.input,
              input && input.inputStyle,
            ])}
            inputContainerStyle={StyleSheet.flatten([
              styles.inputContentContainer,
              input && input.inputContainerStyle,
            ])}
            containerStyle={StyleSheet.flatten([
              styles.inputContainer,
              input && input.containerStyle,
            ])}
          />
        )}
        {switchProps && <Switch {...switchProps} />}
        {badge && <Badge {...badge} />}
        <Text>{rightElement}</Text>
      </PadView>
    </Component>
  );
}

ListItem.propTypes = {
  containerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  rightContentContainerStyle: ViewPropTypes.style,
  Component: PropTypes.elementType,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleStyle: Text.propTypes.style,
  titleProps: PropTypes.object,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitleStyle: Text.propTypes.style,
  subtitleProps: PropTypes.object,
  leftElement: PropTypes.node,
  rightElement: PropTypes.node,
  rightTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  rightTitleStyle: Text.propTypes.style,
  rightTitleProps: PropTypes.object,
  rightSubtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  rightSubtitleStyle: Text.propTypes.style,
  rightSubtitleProps: PropTypes.object,
  input: PropTypes.object,
  switch: PropTypes.object,
  badge: PropTypes.object,
  chevron: PropTypes.bool,
  checkmark: PropTypes.node,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  topDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  pad: PropTypes.number,
  linearGradientProps: PropTypes.object,
  ViewComponent: PropTypes.elementType,
};

ListItem.defaultProps = {
  pad: 16,
  title: '',
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        padding: 14,
      },
      default: {
        padding: 16,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor:
      StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
  },
  title: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      default: {
        fontSize: 16,
      },
    }),
  },
  subtitle: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
      default: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14,
      },
    }),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContentContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputContainer: {
    flex: 1,
    paddingRight: 0,
  },
  inputContentContainer: {
    flex: 1,
    borderBottomWidth: 0,
    width: null,
    height: null,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    width: null,
    height: null,
  },
  rightTitle: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  rightSubtitle: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
});
