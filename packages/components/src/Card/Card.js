import React, { Component } from 'react';
import { View, ViewPropTypes, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export class Card extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    containerStyle: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    overlayStyle: ViewPropTypes.style,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
    theme: PropTypes.object,
  };

  render() {
    const {
      children,
      containerStyle,
      wrapperStyle,
      imageWrapperStyle,
      title,
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
    } = this.props;

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
                  <Text
                    style={StyleSheet.flatten([
                      styles.cardTitle,
                      image && styles.imageCardTitle,
                      titleStyle && titleStyle,
                    ])}
                    numberOfLines={titleNumberOfLines}>
                    {title}
                  </Text>

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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    margin: 15,
    marginBottom: 0,
    shadowColor: 'rgba(0,0,0, .5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 1,
  },
  featuredTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
    fontWeight: '800',
  },
  featuredSubtitle: {
    fontSize: 13,
    marginBottom: 8,
    color: 'white',
    fontWeight: '400',
  },
  wrapper: {
    backgroundColor: 'transparent',
  },
  divider: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
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

export default Card;
