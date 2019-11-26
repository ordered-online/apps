var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = exports.Button = void 0;
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
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
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/Button/Button.js';
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
var Button = (function(_Component) {
  (0, _inherits2.default)(Button, _Component);
  function Button() {
    var _getPrototypeOf2;
    var _this;
    (0, _classCallCheck2.default)(this, Button);
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }
    _this = (0, _possibleConstructorReturn2.default)(
      this,
      (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Button)).call.apply(
        _getPrototypeOf2,
        [this].concat(args)
      )
    );
    _this._handleOnPress = function() {
      _this.props.onPress && _this.props.onPress();
    };
    return _this;
  }
  (0, _createClass2.default)(Button, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          accessibilityLabel = _this$props.accessibilityLabel,
          color = _this$props.color,
          onPress = _this$props.onPress,
          touchSoundDisabled = _this$props.touchSoundDisabled,
          title = _this$props.title,
          hasTVPreferredFocus = _this$props.hasTVPreferredFocus,
          nextFocusDown = _this$props.nextFocusDown,
          nextFocusForward = _this$props.nextFocusForward,
          nextFocusLeft = _this$props.nextFocusLeft,
          nextFocusRight = _this$props.nextFocusRight,
          nextFocusUp = _this$props.nextFocusUp,
          disabled = _this$props.disabled,
          outline = _this$props.outline;
        var buttonStyles = [styles.button];
        var textStyles = [styles.text];
        if (color) {
          if (outline) {
            textStyles.push({ color: color });
          } else {
            buttonStyles.push({ backgroundColor: color });
          }
        } else {
          var defaultColor = '#57c75e';
          if (outline) {
            textStyles.push({ color: defaultColor });
          } else {
            buttonStyles.push({ backgroundColor: defaultColor });
          }
        }
        var accessibilityState = {};
        if (disabled) {
          buttonStyles.push(styles.buttonDisabled);
          textStyles.push(styles.textDisabled);
          accessibilityState.disabled = true;
        }
        var formattedTitle =
          _reactNative.Platform.OS === 'android' ? title.toUpperCase() : title;
        var Touchable =
          _reactNative.Platform.OS === 'android'
            ? _reactNative.TouchableNativeFeedback
            : _reactNative.TouchableOpacity;
        return _react.default.createElement(
          Touchable,
          {
            accessibilityLabel: accessibilityLabel,
            accessibilityRole: 'button',
            accessibilityState: accessibilityState,
            hasTVPreferredFocus: hasTVPreferredFocus,
            nextFocusDown: nextFocusDown,
            nextFocusForward: nextFocusForward,
            nextFocusLeft: nextFocusLeft,
            nextFocusRight: nextFocusRight,
            nextFocusUp: nextFocusUp,
            disabled: disabled,
            onPress: onPress,
            touchSoundDisabled: touchSoundDisabled,
            style: styles.container,
            __source: { fileName: _jsxFileName, lineNumber: 62 },
          },
          _react.default.createElement(
            _reactNative.View,
            {
              style: buttonStyles,
              __source: { fileName: _jsxFileName, lineNumber: 76 },
            },
            _react.default.createElement(
              _reactNative.Text,
              {
                style: textStyles,
                disabled: disabled,
                __source: { fileName: _jsxFileName, lineNumber: 77 },
              },
              formattedTitle
            )
          )
        );
      },
    },
  ]);
  return Button;
})(_react.Component);
exports.Button = Button;
var styles = _reactNative.StyleSheet.create({
  container: { marginVertical: 10, alignItems: 'center' },
  button: _reactNative.Platform.select({
    ios: {},
    android: { elevation: 4, backgroundColor: '#2196F3', borderRadius: 2 },
  }),
  text: _objectSpread(
    { textAlign: 'center', margin: 8 },
    _reactNative.Platform.select({
      ios: { fontSize: 18 },
      android: { fontWeight: '500' },
    }),
    { color: 'white', fontSize: 18 }
  ),
  buttonDisabled: _reactNative.Platform.select({
    ios: {},
    android: { elevation: 0, backgroundColor: '#dfdfdf' },
  }),
  textDisabled: _reactNative.Platform.select({
    ios: { color: '#cdcdcd' },
    android: { color: '#a1a1a1' },
  }),
});
var _default = Button;
exports.default = _default;
//# sourceMappingURL=Button.js.map
