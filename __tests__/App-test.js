import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock('expo', () => ({
  AppLoading: 'AppLoading',
}));

jest.mock('../navigation/AppNavigator', () => 'AppNavigator');

describe('<App', () => {

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
