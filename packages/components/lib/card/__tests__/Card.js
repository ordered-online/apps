var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');
var _react = _interopRequireDefault(require('react'));
var _reactNative = require('react-native');
var _enzyme = require('enzyme');
var _enzymeToJson = _interopRequireDefault(require('enzyme-to-json'));
var _reactTestRenderer = require('react-test-renderer');
var _theme = _interopRequireDefault(require('../../config/theme'));
var _config = require('../../config');
var _Card = _interopRequireWildcard(require('../Card'));
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/card/__tests__/Card.js';
describe('Card Component', function() {
  it('should render without issues', function() {
    var component = (0, _enzyme.shallow)(
      _react.default.createElement(_Card.Card, {
        theme: _theme.default,
        __source: { fileName: _jsxFileName, lineNumber: 14 },
      })
    );
    expect(component.length).toBe(1);
    expect((0, _enzymeToJson.default)(component)).toMatchSnapshot();
  });
  it('should have Card title without image', function() {
    var component = (0, _enzyme.shallow)(
      _react.default.createElement(_Card.Card, {
        theme: _theme.default,
        title: 'Card Title',
        containerStyle: { backgroundColor: 'red' },
        dividerStyle: { backgroundColor: 'red' },
        __source: { fileName: _jsxFileName, lineNumber: 22 },
      })
    );
    expect(component.length).toBe(1);
    expect((0, _enzymeToJson.default)(component)).toMatchSnapshot();
  });
  it('should have Card title with image', function() {
    var component = (0, _enzyme.shallow)(
      _react.default.createElement(_Card.Card, {
        theme: _theme.default,
        title: 'HELLO WORLD',
        image: {
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        },
        containerStyle: { backgroundColor: 'red' },
        titleStyle: { backgroundColor: 'red' },
        __source: { fileName: _jsxFileName, lineNumber: 36 },
      })
    );
    expect(component.length).toBe(1);
    expect((0, _enzymeToJson.default)(component)).toMatchSnapshot();
  });
  it('should have Card with featured title', function() {
    var component = (0, _enzyme.shallow)(
      _react.default.createElement(_Card.Card, {
        theme: _theme.default,
        title: 'foo title',
        image: {
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        },
        imageWrapperStyle: { backgroundColor: 'red' },
        imageStyle: { backgroundColor: 'red' },
        wrapperStyle: { backgroundColor: 'red' },
        featuredTitle: 'featured title',
        featuredSubtitle: 'featured sub title',
        featuredTitleStyle: { backgroundColor: 'red' },
        featuredSubtitleStyle: { backgroundColor: 'red' },
        __source: { fileName: _jsxFileName, lineNumber: 54 },
      })
    );
    expect(component.length).toBe(1);
    expect((0, _enzymeToJson.default)(component)).toMatchSnapshot();
  });
  it('should have custom component as title', function() {
    var component = (0, _enzyme.shallow)(
      _react.default.createElement(_Card.Card, {
        theme: _theme.default,
        title: _react.default.createElement(_reactNative.TextInput, {
          __source: { fileName: _jsxFileName, lineNumber: 76 },
        }),
        __source: { fileName: _jsxFileName, lineNumber: 76 },
      })
    );
    expect(component.length).toBe(1);
    expect((0, _enzymeToJson.default)(component)).toMatchSnapshot();
  });
  it('should apply values from theme', function() {
    var testTheme = { Card: { title: 'Yea b' } };
    var component = (0, _reactTestRenderer.create)(
      _react.default.createElement(
        _config.ThemeProvider,
        {
          theme: testTheme,
          __source: { fileName: _jsxFileName, lineNumber: 90 },
        },
        _react.default.createElement(_Card.default, {
          __source: { fileName: _jsxFileName, lineNumber: 91 },
        })
      )
    );
    expect(
      component.root.findByProps({ testID: 'cardTitle' }).props.children
    ).toBe('Yea b');
    expect(component.toJSON()).toMatchSnapshot();
  });
});
//# sourceMappingURL=Card.js.map
