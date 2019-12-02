import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';

describe('Button', () => {
  it('Button renders correctly', () => {
    const tree = renderer.create(<Button title="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
