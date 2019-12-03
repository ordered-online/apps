var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _react = _interopRequireDefault(require('react'));
var _reactTestRenderer = _interopRequireDefault(require('react-test-renderer'));
var _Button = _interopRequireDefault(require('../Button'));
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/Button/__tests__/Button.test.js';
describe('Button', function() {
  it('Button renders correctly', function() {
    var tree = _reactTestRenderer.default
      .create(
        _react.default.createElement(_Button.default, {
          title: 'test',
          __source: { fileName: _jsxFileName, lineNumber: 8 },
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
//# sourceMappingURL=Button.test.js.map
