var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _react = _interopRequireDefault(require('react'));
var _reactTestRenderer = _interopRequireDefault(require('react-test-renderer'));
var _ = require('../');
var _jsxFileName =
  '/home/felix/Projects/Ordered-Online/ordered.online/packages/components/src/Card/__tests__/Card.js';
describe('Card', function() {
  it('Card renders correctly', function() {
    var tree = _reactTestRenderer.default
      .create(
        _react.default.createElement(_.Card, {
          __source: { fileName: _jsxFileName, lineNumber: 8 },
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
//# sourceMappingURL=Card.js.map
