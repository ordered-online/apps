var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = exports.Card = void 0;
var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);
var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
);
var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
);
var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
);
var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn')
);
var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf')
);
var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
);
var _react = _interopRequireWildcard(require('react'));
var _reactNative = require('react-native');
var _propTypes = _interopRequireDefault(require('prop-types'));
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/Card/Card.js';
var Card = (function(_Component) {
  (0, _inherits2.default)(Card, _Component);
  function Card() {
    (0, _classCallCheck2.default)(this, Card);
    return (0, _possibleConstructorReturn2.default)(
      this,
      (0, _getPrototypeOf2.default)(Card).apply(this, arguments)
    );
  }
  (0, _createClass2.default)(Card, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          children = _this$props.children,
          containerStyle = _this$props.containerStyle,
          wrapperStyle = _this$props.wrapperStyle,
          imageWrapperStyle = _this$props.imageWrapperStyle,
          title = _this$props.title,
          titleStyle = _this$props.titleStyle,
          titleNumberOfLines = _this$props.titleNumberOfLines,
          featuredTitle = _this$props.featuredTitle,
          featuredTitleStyle = _this$props.featuredTitleStyle,
          featuredSubtitle = _this$props.featuredSubtitle,
          featuredSubtitleStyle = _this$props.featuredSubtitleStyle,
          dividerStyle = _this$props.dividerStyle,
          image = _this$props.image,
          imageStyle = _this$props.imageStyle,
          imageProps = _this$props.imageProps,
          attributes = (0, _objectWithoutProperties2.default)(_this$props, [
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
          ]);
        return _react.default.createElement(
          _reactNative.View,
          (0, _extends2.default)({}, attributes, {
            style: _reactNative.StyleSheet.flatten([
              styles.container,
              image && { padding: 0 },
              containerStyle && containerStyle,
            ]),
            __source: { fileName: _jsxFileName, lineNumber: 57 },
          }),
          _react.default.createElement(
            _reactNative.View,
            {
              style: _reactNative.StyleSheet.flatten([
                styles.wrapper,
                wrapperStyle && wrapperStyle,
              ]),
              __source: { fileName: _jsxFileName, lineNumber: 64 },
            },
            title === '' || _react.default.isValidElement(title)
              ? title
              : title &&
                  title.length &&
                  _react.default.createElement(
                    _reactNative.View,
                    { __source: { fileName: _jsxFileName, lineNumber: 73 } },
                    _react.default.createElement(
                      _reactNative.Text,
                      {
                        style: _reactNative.StyleSheet.flatten([
                          styles.cardTitle,
                          image && styles.imageCardTitle,
                          titleStyle && titleStyle,
                        ]),
                        numberOfLines: titleNumberOfLines,
                        __source: { fileName: _jsxFileName, lineNumber: 74 },
                      },
                      title
                    ),
                    !image &&
                      _react.default.createElement(_reactNative.View, {
                        style: _reactNative.StyleSheet.flatten([
                          styles.divider,
                          dividerStyle && dividerStyle,
                        ]),
                        __source: { fileName: _jsxFileName, lineNumber: 85 },
                      })
                  ),
            image &&
              _react.default.createElement(
                _reactNative.View,
                {
                  style: imageWrapperStyle && imageWrapperStyle,
                  __source: { fileName: _jsxFileName, lineNumber: 96 },
                },
                _react.default.createElement(
                  _reactNative.Image,
                  (0, _extends2.default)(
                    {
                      style: [
                        { width: null, height: 150 },
                        imageStyle && imageStyle,
                      ],
                      source: image,
                    },
                    imageProps,
                    { __source: { fileName: _jsxFileName, lineNumber: 97 } }
                  ),
                  (featuredTitle || featuredSubtitle) &&
                    _react.default.createElement(
                      _reactNative.View,
                      {
                        style: styles.overlayContainer,
                        __source: { fileName: _jsxFileName, lineNumber: 102 },
                      },
                      featuredTitle &&
                        _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: _reactNative.StyleSheet.flatten([
                              styles.featuredTitle,
                              featuredTitleStyle && featuredTitleStyle,
                            ]),
                            __source: {
                              fileName: _jsxFileName,
                              lineNumber: 104,
                            },
                          },
                          featuredTitle
                        ),
                      featuredSubtitle &&
                        _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: _reactNative.StyleSheet.flatten([
                              styles.featuredSubtitle,
                              featuredSubtitleStyle && featuredSubtitleStyle,
                            ]),
                            __source: {
                              fileName: _jsxFileName,
                              lineNumber: 113,
                            },
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
                    __source: { fileName: _jsxFileName, lineNumber: 125 },
                  },
                  children
                )
              ),
            !image && children
          )
        );
      },
    },
  ]);
  return Card;
})(_react.Component);
exports.Card = Card;
Card.propTypes = {
  children: _propTypes.default.oneOfType([
    _propTypes.default.element,
    _propTypes.default.arrayOf(_propTypes.default.element),
  ]),
  containerStyle: _reactNative.ViewPropTypes.style,
  wrapperStyle: _reactNative.ViewPropTypes.style,
  overlayStyle: _reactNative.ViewPropTypes.style,
  title: _propTypes.default.oneOfType([
    _propTypes.default.string,
    _propTypes.default.element,
  ]),
  titleStyle: _reactNative.TextPropTypes.style,
  featuredTitle: _propTypes.default.string,
  featuredTitleStyle: _reactNative.TextPropTypes.style,
  featuredSubtitle: _propTypes.default.string,
  featuredSubtitleStyle: _reactNative.TextPropTypes.style,
  dividerStyle: _reactNative.ViewPropTypes.style,
  image: _reactNative.Image.propTypes.source,
  imageStyle: _reactNative.ViewPropTypes.style,
  imageWrapperStyle: _reactNative.ViewPropTypes.style,
  imageProps: _propTypes.default.object,
  titleNumberOfLines: _propTypes.default.number,
  theme: _propTypes.default.object,
};
var styles = _reactNative.StyleSheet.create({
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
  wrapper: { backgroundColor: 'transparent' },
  divider: { marginBottom: 15 },
  cardTitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
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
});
var _default = Card;
exports.default = _default;
//# sourceMappingURL=Card.js.map
