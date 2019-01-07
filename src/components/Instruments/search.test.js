import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library'
import Search from './search';

beforeEach(function () {
  global.handleCurrencyNameChange = jest.fn(async () => { });
});

afterEach(cleanup)

const renderComponent = () => render(<Search handleCurrencyNameChange={handleCurrencyNameChange} />)

test('Search changed handle triggered', () => {
  const { getByLabelText } = renderComponent()
  fireEvent.change(getByLabelText('Find currency'), { target: { value: 'GBP' } })
  expect(handleCurrencyNameChange).toHaveBeenCalledTimes(1);
})
