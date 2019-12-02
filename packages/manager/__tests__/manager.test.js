import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

jest.mock('expo', () => ({
  AppLoading: 'AppLoading',
}));

jest.mock('../navigation/AppNavigator', () => 'AppNavigator');

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: props => props.children,
}));

describe('Manager', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it(`manager renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`manager renders the root without loading screen`, () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
