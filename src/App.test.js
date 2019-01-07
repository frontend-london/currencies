import React from 'react';
import App from './App';
import { render, cleanup } from 'react-testing-library'
afterEach(cleanup)

test('App rendered', () => {
  render(<App />)
});