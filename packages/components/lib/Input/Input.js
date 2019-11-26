var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = exports.Input = void 0;
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
var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf')
);
var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
);
var _react = _interopRequireWildcard(require('react'));
var _reactNative = require('react-native');
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/Input/Input.js';
var Input = (function(_Component) {
  (0, _inherits2.default)(Input, _Component);
  function Input() {
    (0, _classCallCheck2.default)(this, Input);
    return (0, _possibleConstructorReturn2.default)(
      this,
      (0, _getPrototypeOf2.default)(Input).apply(this, arguments)
    );
  }
  (0, _createClass2.default)(Input, [
    {
      key: 'render',
      value: function render() {
        return _react.default.createElement(
          _reactNative.TextInput,
          (0, _extends2.default)({}, this.props, {
            style: styles.textInput,
            __source: { fileName: _jsxFileName, lineNumber: 6 },
          })
        );
      },
    },
  ]);
  return Input;
})(_react.Component);
exports.Input = Input;
var styles = _reactNative.StyleSheet.create({
  textInput: {
    textAlign: 'center',
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#57c75e',
  },
});
var _default = Input;
exports.default = _default;
//# sourceMappingURL=Input.js.map
