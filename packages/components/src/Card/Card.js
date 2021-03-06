import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, StyleSheet, ViewPropTypes } from 'react-native';

import Text from '../Text';
import Image from '../Image';

export default function Card(props) {
  const {
    children,
    containerStyle,
    wrapperStyle,
    imageWrapperStyle,
    title,
    titleRightElement,
    titleLeftElement,
    titleStyle,
    titleNumberOfLines,
    featuredTitle,
    featuredTitleStyle,
    featuredSubtitle,
    featuredSubtitleStyle,
    dividerStyle,
    image,
    imageStyle,
    imageProps,
    ...attributes
  } = props;

  return (
    <View
      {...attributes}
      style={StyleSheet.flatten([
        styles.container,
        image && { padding: 0 },
        containerStyle && containerStyle,
      ])}>
      <View
        style={StyleSheet.flatten([
          styles.wrapper,
          wrapperStyle && wrapperStyle,
        ])}>
        {title === '' || React.isValidElement(title)
          ? title
          : title &&
            title.length && (
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  {titleLeftElement}
                  <Text
                    testID="cardTitle"
                    style={StyleSheet.flatten([
                      styles.cardTitle,
                      image && styles.imageCardTitle,
                      titleStyle && titleStyle,
                    ])}
                    numberOfLines={titleNumberOfLines}>
                    {title}
                  </Text>
                  {titleRightElement}
                </View>
                {!image && (
                  <View
                    style={StyleSheet.flatten([
                      styles.divider,
                      dividerStyle && dividerStyle,
                    ])}
                  />
                )}
              </View>
            )}

        {image && (
          <View style={imageWrapperStyle && imageWrapperStyle}>
            <Image
              style={[{ width: null, height: 150 }, imageStyle && imageStyle]}
              source={image}
              {...imageProps}>
              {(featuredTitle || featuredSubtitle) && (
                <View style={styles.overlayContainer}>
                  {featuredTitle && (
                    <Text
                      style={StyleSheet.flatten([
                        styles.featuredTitle,
                        featuredTitleStyle && featuredTitleStyle,
                      ])}>
                      {featuredTitle}
                    </Text>
                  )}
                  {featuredSubtitle && (
                    <Text
                      style={StyleSheet.flatten([
                        styles.featuredSubtitle,
                        featuredSubtitleStyle && featuredSubtitleStyle,
                      ])}>
                      {featuredSubtitle}
                    </Text>
                  )}
                </View>
              )}
            </Image>

            <View
              style={StyleSheet.flatten([
                { padding: 10 },
                wrapperStyle && wrapperStyle,
              ])}>
              {children}
            </View>
          </View>
        )}

        {!image && children}
      </View>
    </View>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  overlayStyle: ViewPropTypes.style,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleRightElement: PropTypes.node,
  titleLeftElement: PropTypes.node,
  titleStyle: Text.propTypes.style,
  featuredTitle: PropTypes.string,
  featuredTitleStyle: Text.propTypes.style,
  featuredSubtitle: PropTypes.string,
  featuredSubtitleStyle: Text.propTypes.style,
  dividerStyle: ViewPropTypes.style,
  image: Image.propTypes.source,
  imageStyle: ViewPropTypes.style,
  imageWrapperStyle: ViewPropTypes.style,
  imageProps: PropTypes.object,
  titleNumberOfLines: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    borderColor: '#e1e8ee',
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  featuredTitle: {
    fontSize: 22,
    marginBottom: 8,
    color: 'white',
    ...Platform.select({
      android: {
        color: 'rgba(0, 0, 0, 0.87)',
      },
      default: {
        fontWeight: '800',
      },
    }),
  },
  featuredSubtitle: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
    ...Platform.select({
      android: {
        color: 'rgba(0, 0, 0, 0.87)',
      },
      default: {
        fontWeight: '400',
      },
    }),
  },
  wrapper: {
    backgroundColor: 'transparent',
  },
  divider: {
    marginBottom: 15,
    height: StyleSheet.hairlineWidth,
    backgroundColor:
      StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
  },
  cardTitle: {
    marginTop: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#43484d',
    ...Platform.select({
      android: {
        color: 'rgba(0, 0, 0, 0.87)',
      },
      default: {
        fontWeight: 'bold',
      },
    }),
    textAlign: 'center',
    marginBottom: 15,
  },
  imageCardTitle: {
    marginTop: 15,
  },
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignSelf: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
