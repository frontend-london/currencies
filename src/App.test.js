import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from 'react-testing-library'
import Instruments from './components/Instruments';

afterEach(cleanup)

test('Instruments component rendered', () => {
  const { getByText } = render(<Instruments />)
});