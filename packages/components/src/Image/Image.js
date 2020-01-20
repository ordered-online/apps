import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Image as ReactNativeImage,
  StyleSheet,
  View,
  Platform,
  ViewPropTypes,
} from 'react-native';

export default function Image(props) {
  const placeholderOpacity = useRef(new Animated.Value(1)).current;
  const [isLoading, setIsLoading] = useState(false);

  const {
    placeholderStyle,
    PlaceholderContent,
    containerStyle,
    style,
    ImageComponent,
    children,
    ...attributes
  } = props;

  const hasImage = Boolean(attributes.source);

  useEffect(() => {
    if (isLoading) {
      if (!props.transition) {
        placeholderOpacity.setValue(0);
        return;
      }

      const minimumWait = 100;
      const staggerNonce = 200 * Math.random();

      setTimeout(
        () => {
          Animated.timing(placeholderOpacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: Platform.OS === 'android' ? false : true,
          }).start();
          setIsLoading(false);
        },
        Platform.OS === 'android' ? 0 : Math.floor(minimumWait + staggerNonce)
      );
    }
  }, [isLoading]);

  const onLoad = () => setIsLoading(true);

  return (
    <View
      accessibilityIgnoresInvertColors={true}
      style={StyleSheet.flatten([
        styles.container,
        containerStyle,
        {
          width: style.width,
          height: style.height,
        },
      ])}>
      <ImageComponent
        testID="imageImage"
        {...attributes}
        onLoad={onLoad}
        style={[
          StyleSheet.absoluteFill,
          {
            width: style.width,
            height: style.height,
          },
        ]}
      />

      <Animated.View
        pointerEvents={hasImage ? 'none' : 'auto'}
        accessibilityElementsHidden={hasImage}
        importantForAccessibility={hasImage ? 'no-hide-descendants' : 'yes'}
        style={[
          styles.placeholderContainer,
          {
            opacity: hasImage ? placeholderOpacity : 1,
          },
        ]}>
        <View
          testID="imagePlaceholder"
          style={StyleSheet.flatten([
            style,
            styles.placeholder,
            placeholderStyle,
          ])}>
          {PlaceholderContent}
        </View>
      </Animated.View>

      <View style={style}>{children}</View>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  placeholderContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholder: {
    backgroundColor: '#bdbdbd',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

Image.propTypes = {
  ...ReactNativeImage.propTypes,
  ImageComponent: PropTypes.elementType,
  PlaceholderContent: PropTypes.node,
  containerStyle: ViewPropTypes.style,
  placeholderStyle: ReactNativeImage.propTypes.style,
  transition: PropTypes.bool,
};

Image.defaultProps = {
  ImageComponent: ReactNativeImage,
  style: {},
  transition: true,
};
