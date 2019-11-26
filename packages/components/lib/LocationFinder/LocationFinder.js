var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = exports.LocationFinder = void 0;
var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
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
var _expoConstants = _interopRequireDefault(require('expo-constants'));
var Location = _interopRequireWildcard(require('expo-location'));
var Permissions = _interopRequireWildcard(require('expo-permissions'));
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/LocationFinder/LocationFinder.js';
var LocationFinder = (function(_Component) {
  (0, _inherits2.default)(LocationFinder, _Component);
  function LocationFinder() {
    var _getPrototypeOf2;
    var _this;
    (0, _classCallCheck2.default)(this, LocationFinder);
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
        LocationFinder
      )).call.apply(_getPrototypeOf2, [this].concat(args))
    );
    _this.state = { location: null, errorMessage: null };
    _this._getLocationAsync = function _callee() {
      var _ref, status, location;
      return _regenerator.default.async(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return _regenerator.default.awrap(
                Permissions.askAsync(Permissions.LOCATION)
              );
            case 2:
              _ref = _context.sent;
              status = _ref.status;
              if (status !== 'granted') {
                _this.setState({
                  errorMessage: 'Permission to access location was denied',
                });
              }
              _context.next = 7;
              return _regenerator.default.awrap(
                Location.getCurrentPositionAsync({})
              );
            case 7:
              location = _context.sent;
              _this.setState({ location: location });
            case 9:
            case 'end':
              return _context.stop();
          }
        }
      });
    };
    return _this;
  }
  (0, _createClass2.default)(LocationFinder, [
    {
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (
          _reactNative.Platform.OS === 'android' &&
          !_expoConstants.default.isDevice
        ) {
          this.setState({
            errorMessage:
              'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var text = 'Waiting..';
        if (this.state.errorMessage) {
          text = this.state.errorMessage;
        } else if (this.state.location) {
          text = JSON.stringify(this.state.location);
        }
        return _react.default.createElement(
          _reactNative.View,
          {
            style: styles.container,
            __source: { fileName: _jsxFileName, lineNumber: 45 },
          },
          _react.default.createElement(
            _reactNative.Text,
            {
              style: styles.paragraph,
              __source: { fileName: _jsxFileName, lineNumber: 46 },
            },
            text
          )
        );
      },
    },
  ]);
  return LocationFinder;
})(_react.Component);
exports.LocationFinder = LocationFinder;
var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: _expoConstants.default.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: { margin: 24, fontSize: 18, textAlign: 'center' },
});
var _default = LocationFinder;
exports.default = _default;
//# sourceMappingURL=LocationFinder.js.map
