import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Instruments from './components/Instruments';

it('renders without crashing', () => {
  shallow(<App />);
});

it('includes Instruments', () => {
  const app = shallow(<App />);
  expect(app.containsMatchingElement(<Instruments />)).toEqual(true)
});
