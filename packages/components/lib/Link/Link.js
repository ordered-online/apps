var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = exports.Link = void 0;
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
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/Link/Link.js';
var Link = (function(_Component) {
  (0, _inherits2.default)(Link, _Component);
  function Link() {
    (0, _classCallCheck2.default)(this, Link);
    return (0, _possibleConstructorReturn2.default)(
      this,
      (0, _getPrototypeOf2.default)(Link).apply(this, arguments)
    );
  }
  (0, _createClass2.default)(Link, [
    {
      key: 'render',
      value: function render() {
        var Touchable =
          _reactNative.Platform.OS === 'android'
            ? _reactNative.TouchableNativeFeedback
            : _reactNative.TouchableOpacity;
        var _this$props = this.props,
          onPress = _this$props.onPress,
          title = _this$props.title;
        return _react.default.createElement(
          _reactNative.View,
          { __source: { fileName: _jsxFileName, lineNumber: 17 } },
          _react.default.createElement(
            Touchable,
            {
              onPress: onPress,
              style: styles.link,
              __source: { fileName: _jsxFileName, lineNumber: 18 },
            },
            _react.default.createElement(
              _reactNative.View,
              { __source: { fileName: _jsxFileName, lineNumber: 19 } },
              _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.linkText,
                  __source: { fileName: _jsxFileName, lineNumber: 20 },
                },
                ' ',
                title,
                ' '
              )
            )
          )
        );
      },
    },
  ]);
  return Link;
})(_react.Component);
exports.Link = Link;
var styles = _reactNative.StyleSheet.create({
  link: { marginVertical: 15 },
  linkText: { fontSize: 18 },
});
var _default = Link;
exports.default = _default;
//# sourceMappingURL=Link.js.map
