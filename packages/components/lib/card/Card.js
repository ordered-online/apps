var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = exports.Card = void 0;
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);
var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);
var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
);
var _react = _interopRequireDefault(require('react'));
var _propTypes = _interopRequireDefault(require('prop-types'));
var _reactNative = require('react-native');
var _normalizeText = _interopRequireDefault(
  require('../helpers/normalizeText')
);
var _config = require('../config');
var _Text = _interopRequireDefault(require('../text/Text'));
var _Divider = _interopRequireDefault(require('../divider/Divider'));
var _Image = _interopRequireDefault(require('../image/Image'));
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/card/Card.js';
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        (0, _defineProperty2.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}
var Card = function Card(props) {
  var children = props.children,
    containerStyle = props.containerStyle,
    wrapperStyle = props.wrapperStyle,
    imageWrapperStyle = props.imageWrapperStyle,
    title = props.title,
    titleStyle = props.titleStyle,
    titleNumberOfLines = props.titleNumberOfLines,
    featuredTitle = props.featuredTitle,
    featuredTitleStyle = props.featuredTitleStyle,
    featuredSubtitle = props.featuredSubtitle,
    featuredSubtitleStyle = props.featuredSubtitleStyle,
    dividerStyle = props.dividerStyle,
    image = props.image,
    imageStyle = props.imageStyle,
    imageProps = props.imageProps,
    theme = props.theme,
    attributes = (0, _objectWithoutProperties2.default)(props, [
      'children',
      'containerStyle',
      'wrapperStyle',
      'imageWrapperStyle',
      'title',
      'titleStyle',
      'titleNumberOfLines',
      'featuredTitle',
      'featuredTitleStyle',
      'featuredSubtitle',
      'featuredSubtitleStyle',
      'dividerStyle',
      'image',
      'imageStyle',
      'imageProps',
      'theme',
    ]);
  return _react.default.createElement(
    _reactNative.View,
    (0, _extends2.default)({}, attributes, {
      style: _reactNative.StyleSheet.flatten([
        styles.container(theme),
        image && { padding: 0 },
        containerStyle && containerStyle,
      ]),
      __source: { fileName: _jsxFileName, lineNumber: 34 },
    }),
    _react.default.createElement(
      _reactNative.View,
      {
        style: _reactNative.StyleSheet.flatten([
          styles.wrapper,
          wrapperStyle && wrapperStyle,
        ]),
        __source: { fileName: _jsxFileName, lineNumber: 42 },
      },
      title === '' || _react.default.isValidElement(title)
        ? title
        : title &&
            title.length &&
            _react.default.createElement(
              _reactNative.View,
              { __source: { fileName: _jsxFileName, lineNumber: 52 } },
              _react.default.createElement(
                _Text.default,
                {
                  testID: 'cardTitle',
                  style: _reactNative.StyleSheet.flatten([
                    styles.cardTitle(theme),
                    image && styles.imageCardTitle,
                    titleStyle && titleStyle,
                  ]),
                  numberOfLines: titleNumberOfLines,
                  __source: { fileName: _jsxFileName, lineNumber: 53 },
                },
                title
              ),
              !image &&
                _react.default.createElement(_Divider.default, {
                  style: _reactNative.StyleSheet.flatten([
                    styles.divider,
                    dividerStyle && dividerStyle,
                  ]),
                  __source: { fileName: _jsxFileName, lineNumber: 66 },
                })
            ),
      image &&
        _react.default.createElement(
          _reactNative.View,
          {
            style: imageWrapperStyle && imageWrapperStyle,
            __source: { fileName: _jsxFileName, lineNumber: 77 },
          },
          _react.default.createElement(
            _Image.default,
            (0, _extends2.default)(
              {
                style: [{ width: null, height: 150 }, imageStyle && imageStyle],
                source: image,
              },
              imageProps,
              { __source: { fileName: _jsxFileName, lineNumber: 78 } }
            ),
            (featuredTitle || featuredSubtitle) &&
              _react.default.createElement(
                _reactNative.View,
                {
                  style: styles.overlayContainer,
                  __source: { fileName: _jsxFileName, lineNumber: 84 },
                },
                featuredTitle &&
                  _react.default.createElement(
                    _Text.default,
                    {
                      style: _reactNative.StyleSheet.flatten([
                        styles.featuredTitle,
                        featuredTitleStyle && featuredTitleStyle,
                      ]),
                      __source: { fileName: _jsxFileName, lineNumber: 86 },
                    },
                    featuredTitle
                  ),
                featuredSubtitle &&
                  _react.default.createElement(
                    _Text.default,
                    {
                      style: _reactNative.StyleSheet.flatten([
                        styles.featuredSubtitle,
                        featuredSubtitleStyle && featuredSubtitleStyle,
                      ]),
                      __source: { fileName: _jsxFileName, lineNumber: 96 },
                    },
                    featuredSubtitle
                  )
              )
          ),
          _react.default.createElement(
            _reactNative.View,
            {
              style: _reactNative.StyleSheet.flatten([
                { padding: 10 },
                wrapperStyle && wrapperStyle,
              ]),
              __source: { fileName: _jsxFileName, lineNumber: 109 },
            },
            children
          )
        ),
      !image && children
    )
  );
};
exports.Card = Card;
Card.propTypes = {
  children: _propTypes.default.oneOfType([
    _propTypes.default.element,
    _propTypes.default.arrayOf(_propTypes.default.element),
  ]),
  containerStyle: _config.ViewPropTypes.style,
  wrapperStyle: _config.ViewPropTypes.style,
  overlayStyle: _config.ViewPropTypes.style,
  title: _propTypes.default.oneOfType([
    _propTypes.default.string,
    _propTypes.default.element,
  ]),
  titleStyle: _config.TextPropTypes.style,
  featuredTitle: _propTypes.default.string,
  featuredTitleStyle: _config.TextPropTypes.style,
  featuredSubtitle: _propTypes.default.string,
  featuredSubtitleStyle: _config.TextPropTypes.style,
  dividerStyle: _config.ViewPropTypes.style,
  image: _reactNative.Image.propTypes.source,
  imageStyle: _config.ViewPropTypes.style,
  imageWrapperStyle: _config.ViewPropTypes.style,
  imageProps: _propTypes.default.object,
  titleNumberOfLines: _propTypes.default.number,
  theme: _propTypes.default.object,
};
var styles = {
  container: function container(theme) {
    return _objectSpread(
      {
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 15,
        margin: 15,
        marginBottom: 0,
        borderColor: theme.colors.grey5,
      },
      _reactNative.Platform.select({
        android: { elevation: 1 },
        default: {
          shadowColor: 'rgba(0,0,0, .2)',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 1,
          shadowRadius: 1,
        },
      })
    );
  },
  featuredTitle: _objectSpread(
    {
      fontSize: (0, _normalizeText.default)(18),
      marginBottom: 8,
      color: 'white',
    },
    _reactNative.Platform.select({
      android: _objectSpread({}, _config.fonts.android.black),
      default: { fontWeight: '800' },
    })
  ),
  featuredSubtitle: _objectSpread(
    {
      fontSize: (0, _normalizeText.default)(13),
      marginBottom: 8,
      color: 'white',
    },
    _reactNative.Platform.select({
      android: _objectSpread({}, _config.fonts.android.black),
      default: { fontWeight: '400' },
    })
  ),
  wrapper: { backgroundColor: 'transparent' },
  divider: { marginBottom: 15 },
  cardTitle: function cardTitle(theme) {
    return _objectSpread(
      { fontSize: (0, _normalizeText.default)(14), color: theme.colors.grey1 },
      _reactNative.Platform.select({
        android: _objectSpread({}, _config.fonts.android.black),
        default: { fontWeight: 'bold' },
      }),
      { textAlign: 'center', marginBottom: 15 }
    );
  },
  imageCardTitle: { marginTop: 15 },
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
};
var _default = (0, _config.withTheme)(Card, 'Card');
exports.default = _default;
//# sourceMappingURL=Card.js.map
