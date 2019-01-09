import React from 'react';
import { render, cleanup } from 'react-testing-library'
import Nav from './nav';
import currencies from '../../../public/currencies.test.json';

beforeEach(function () {
  global.handlePrevDayClick = jest.fn(() => { });
  global.handleNextDayClick = jest.fn(() => { });
});

afterEach(cleanup)

const renderComponent = (currentDate) => render(<Nav currentDate={currentDate} days={currencies} handlePrevDayClick={handlePrevDayClick} handleNextDayClick={handleNextDayClick} />)

test('Only next button visible', () => {
  const { queryByText } = renderComponent('2017-01-02')
  expect(queryByText(/Next day/i)).not.toBeNull()
  expect(queryByText(/Previous day/i)).toBeNull()
})

test('Only previous button visible', () => {
  const { queryByText } = renderComponent('2017-01-05')
  expect(queryByText(/Next day/i)).toBeNull()
  expect(queryByText(/Previous day/i)).not.toBeNull()
})

test('Both buttons visible', () => {
  const { queryByText } = renderComponent('2017-01-04')
  expect(queryByText(/Next day/i)).not.toBeNull()
  expect(queryByText(/Previous day/i)).not.toBeNull()
})
