var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = void 0;
var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
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
var _getPrototypeOf3 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf')
);
var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
);
var _react = _interopRequireWildcard(require('react'));
var _reactNative = require('react-native');
var _expo = require('expo');
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/BrowserLink/BrowserLink.js';
var BrowserLink = (function(_React$Component) {
  (0, _inherits2.default)(BrowserLink, _React$Component);
  function BrowserLink() {
    var _getPrototypeOf2;
    var _this;
    (0, _classCallCheck2.default)(this, BrowserLink);
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }
    _this = (0, _possibleConstructorReturn2.default)(
      this,
      (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(
        BrowserLink
      )).call.apply(_getPrototypeOf2, [this].concat(args))
    );
    _this._handleOpenWithWebBrowser = function() {
      _expo.WebBrowser.openBrowserAsync(_this.props.href);
      _this.props.onPress && _this.props.onPress();
    };
    return _this;
  }
  (0, _createClass2.default)(BrowserLink, [
    {
      key: 'render',
      value: function render() {
        return _react.default.createElement(
          _reactNative.Text,
          (0, _extends2.default)({}, this.props, {
            onPress: this._handleOpenWithWebBrowser,
            __source: { fileName: _jsxFileName, lineNumber: 13 },
          }),
          this.props.children
        );
      },
    },
  ]);
  return BrowserLink;
})(_react.default.Component);
exports.default = BrowserLink;
//# sourceMappingURL=BrowserLink.js.map
