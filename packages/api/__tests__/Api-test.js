jest.autoMockOff();

import * as api from '../src/index';
import { getEnvironment } from '../src/environment';

describe('Api', () => {
  describe('api-test-development', () => {
    let prev;
    beforeAll(() => {
      prev = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
    });
    afterAll(() => {
      process.env.NODE_ENV = prev;
    });

    test('Api-Url in Development', () => {
      const environment = getEnvironment();
      const API_URL = environment.API_URL;
      expect(API_URL).toBe('localhost');
    });
  });

  describe('api-test-production', () => {
    let prev;
    beforeAll(() => {
      prev = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
    });
    afterAll(() => {
      process.env.NODE_ENV = prev;
    });

    test('Api-Url in Production', () => {
      const environment = getEnvironment();
      const API_URL = environment.API_URL;
      expect(API_URL).toBe('ordered.online');
    });
  });
});
