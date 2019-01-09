import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library'
import Header from './header';
import currencies from '../../../public/currencies.test.json';

beforeEach(function () {
  global.handleCurrentDateChange = jest.fn(() => { });
});

afterEach(cleanup)

const currentDate = '2017-01-02'
const renderComponent = () => render(<Header currentDate={currentDate} handleCurrentDateChange={handleCurrentDateChange} days={currencies} />)

test('Current date select has correct options and is set correctly', () => {
  const { getBySelectText } = renderComponent()
  const select = getBySelectText(currentDate)
  const options = Array.from(select.options).map(option => option.text)
  expect(options).toEqual(['2017-01-02', '2017-01-03', '2017-01-04', '2017-01-05']);
})

test('Current date change handler triggered', () => {
  const { getBySelectText } = renderComponent()
  const select = getBySelectText(currentDate)
  fireEvent.change(select, { target: { value: '2017-01-05' } })
  expect(handleCurrentDateChange).toHaveBeenCalledTimes(1);
})
