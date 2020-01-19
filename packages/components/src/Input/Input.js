import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TextInput,
  Animated,
  Easing,
  Platform,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';

const Input = forwardRef(function(props, ref) {
  const inputRef = useRef();

  const focus = () => inputRef.current.focus();

  const blur = () => inputRef.current.blur();

  const clear = () => inputRef.current.clear();

  const isFocused = () => inputRef.current.isFocused();

  const shakeAnimationValue = new Animated.Value(0);

  const shake = () => {
    shakeAnimationValue.setValue(0);
    Animated.timing(shakeAnimationValue, {
      duration: 375,
      toValue: 3,
      ease: Easing.bounce,
    }).start();
  };

  const translateX = shakeAnimationValue.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0],
  });

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    clear,
    isFocused,
    shake,
  }));

  const {
    multiline,
    onLayout,
    onContentSizeChange,
    containerStyle,
    disabled,
    disabledInputStyle,
    inputContainerStyle,
    leftIcon,
    leftIconContainerStyle,
    rightIcon,
    rightIconContainerStyle,
    InputComponent,
    inputStyle,
    errorProps,
    errorStyle,
    errorMessage,
    label,
    labelStyle,
    labelProps,
    ...rest
  } = props;

  const [numberOfLines, setNumberOfLines] = useState(1);
  const [height, setHeight] = useState(40);

  const _onLayout = event => {
    const newHeight = event.nativeEvent.layout.height || null;
    if (newHeight) adjustHeight(newHeight);
    if (onLayout) onLayout();
  };

  const _onContentSizeChange = event => {
    const newHeight = event.nativeEvent.contentSize.height || null;
    if (newHeight) adjustHeight(newHeight);
    if (onContentSizeChange) onContentSizeChange();
  };

  const adjustHeight = newHeight => {
    // the height increased therefore we also increase the line counter
    if (height < newHeight) {
      setNumberOfLines(numberOfLines + 1);
    }
    // the height decreased, we subtract a line from the line counter
    if (height > newHeight) {
      setNumberOfLines(numberOfLines - 1);
    }
    setHeight(newHeight);
  };

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <Text
        style={StyleSheet.flatten([labelStyle, styles.label])}
        {...labelProps}></Text>

      <Animated.View
        style={StyleSheet.flatten([
          styles.inputContainer,
          inputContainerStyle,
          { transform: [{ translateX }] },
        ])}>
        {leftIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              leftIconContainerStyle,
            ])}>
            {leftIcon}
          </View>
        )}

        <InputComponent
          testID="inputTextInput"
          underlineColorAndroid="transparent"
          editable={!disabled}
          {...rest}
          caretHidden={true}
          ref={inputRef}
          style={StyleSheet.flatten([
            styles.input,
            inputStyle,
            disabled && styles.disabledInput,
            disabled && disabledInputStyle,
          ])}
          multiline={multiline}
          onLayout={_onLayout}
          onContentSizeChange={_onContentSizeChange}
          numberOfLines={numberOfLines}
        />

        {rightIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              rightIconContainerStyle,
            ])}>
            {rightIcon}
          </View>
        )}
      </Animated.View>

      {!!errorMessage && (
        <Text
          {...errorProps}
          style={StyleSheet.flatten([styles.error, errorStyle && errorStyle])}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
});

Input.defaultProps = {
  InputComponent: TextInput,
};

Input.propTypes = {
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  disabledInputStyle: Text.propTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  leftIcon: PropTypes.node,
  leftIconContainerStyle: ViewPropTypes.style,
  rightIcon: PropTypes.node,
  rightIconContainerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  InputComponent: PropTypes.elementType,
  errorProps: PropTypes.object,
  errorStyle: Text.propTypes.style,
  errorMessage: PropTypes.string,
  label: PropTypes.node,
  labelStyle: Text.propTypes.style,
  labelProps: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  disabledInput: {
    opacity: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: '#86939e',
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    flex: 1,
    minHeight: 40,
    lineHeight: 40,
  },
  error: {
    margin: 5,
    fontSize: 12,
    color: '#ff190c',
  },
  label: {
    fontSize: 16,
    color: '#86939e',
    ...Platform.select({
      android: {
        fontWeight: '500',
      },
      default: {
        fontWeight: 'bold',
      },
    }),
  },
});

export default Input;
