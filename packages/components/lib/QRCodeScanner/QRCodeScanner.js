var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = exports.QRCodeScanner = void 0;
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
var Permissions = _interopRequireWildcard(require('expo-permissions'));
var _expoBarcodeScanner = require('expo-barcode-scanner');
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/QRCodeScanner/QRCodeScanner.js';
var QRCodeScanner = (function(_Component) {
  (0, _inherits2.default)(QRCodeScanner, _Component);
  function QRCodeScanner() {
    var _getPrototypeOf2;
    var _this;
    (0, _classCallCheck2.default)(this, QRCodeScanner);
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
        QRCodeScanner
      )).call.apply(_getPrototypeOf2, [this].concat(args))
    );
    _this.state = {
      hasCameraPermission: null,
      scanned: false,
      errorMessage: null,
    };
    _this._getPermissionsAsync = function _callee() {
      var _ref, status;
      return _regenerator.default.async(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return _regenerator.default.awrap(
                Permissions.askAsync(Permissions.CAMERA)
              );
            case 2:
              _ref = _context.sent;
              status = _ref.status;
              if (status !== 'granted') {
                _this.setState({
                  errorMessage: 'Permission to access location was denied',
                  hasCameraPermission: status === 'granted',
                });
              } else {
                _this.setState({ hasCameraPermission: status === 'granted' });
              }
            case 5:
            case 'end':
              return _context.stop();
          }
        }
      });
    };
    _this._handleBarCodeScanned = function(_ref2) {
      var type = _ref2.type,
        data = _ref2.data;
      _this.setState({ scanned: true });
      alert(
        'Bar code with type ' +
          type +
          ' and data ' +
          data +
          ' has been scanned!'
      );
      _this.props.onBarCodeScanned && _this.props.onBarCodeScanned(data);
    };
    return _this;
  }
  (0, _createClass2.default)(QRCodeScanner, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        return _regenerator.default.async(
          function componentDidMount$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  if (
                    _reactNative.Platform.OS === 'android' &&
                    !_expoConstants.default.isDevice
                  ) {
                    this.setState({
                      errorMessage:
                        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
                    });
                  } else {
                    this._getPermissionsAsync();
                  }
                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          },
          null,
          this
        );
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;
        var _this$state = this.state,
          hasCameraPermission = _this$state.hasCameraPermission,
          scanned = _this$state.scanned;
        if (hasCameraPermission === null) {
          return _react.default.createElement(
            _reactNative.View,
            { __source: { fileName: _jsxFileName, lineNumber: 49 } },
            _react.default.createElement(
              _reactNative.Text,
              { __source: { fileName: _jsxFileName, lineNumber: 50 } },
              'Requesting for camera permission'
            )
          );
        }
        if (hasCameraPermission === false) {
          return _react.default.createElement(
            _reactNative.View,
            { __source: { fileName: _jsxFileName, lineNumber: 56 } },
            _react.default.createElement(
              _reactNative.Text,
              { __source: { fileName: _jsxFileName, lineNumber: 57 } },
              'No access to camera'
            )
          );
        }
        return _react.default.createElement(
          _reactNative.View,
          {
            style: {
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
            },
            __source: { fileName: _jsxFileName, lineNumber: 62 },
          },
          _react.default.createElement(_expoBarcodeScanner.BarCodeScanner, {
            onBarCodeScanned: scanned ? undefined : this._handleBarCodeScanned,
            style: _reactNative.StyleSheet.absoluteFillObject,
            __source: { fileName: _jsxFileName, lineNumber: 68 },
          }),
          scanned &&
            _react.default.createElement(_reactNative.Button, {
              title: 'Tap to Scan Again',
              onPress: function onPress() {
                return _this2.setState({ scanned: false });
              },
              __source: { fileName: _jsxFileName, lineNumber: 74 },
            })
        );
      },
    },
  ]);
  return QRCodeScanner;
})(_react.Component);
exports.QRCodeScanner = QRCodeScanner;
var _default = QRCodeScanner;
exports.default = _default;
//# sourceMappingURL=QRCodeScanner.js.map
