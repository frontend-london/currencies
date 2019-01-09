import React from 'react';
import { render, fireEvent, cleanup, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Instruments from './index';
import currencies from '../../../public/currencies.test.json';

const API_URL = 'currencies.test.json';
const PER_PAGE = 15;

afterEach(cleanup)

beforeEach(function () {

  global.fetch = jest.fn(async () => {
    return {
      ok: true,
      json: function () {
        return currencies
      }
    };
  });

});

const renderComponent = () => render(<Instruments api={API_URL} perPage={PER_PAGE} />)

test('Component rendered with correct date and number of rows', async () => {
  const { getAllByTestId, getBySelectText } = renderComponent()
  await wait(() => getBySelectText('2017-01-02'));
  expect(getAllByTestId('row').length).toEqual(PER_PAGE);
})

test('Searching returns limited number of currencies', async () => {
  const { getByLabelText, getAllByTestId, getBySelectText } = renderComponent()
  await wait(() => getBySelectText('2017-01-02'));
  const searchField = getByLabelText('Find currency')
  fireEvent.change(searchField, { target: { value: 'GBP' } })
  expect(getAllByTestId('row').length).toEqual(1);
  fireEvent.change(searchField, { target: { value: 'GBP,EUR' } })
  expect(getAllByTestId('row').length).toEqual(2);
  fireEvent.change(searchField, { target: { value: 'GBP,EUR,A' } })
  expect(getAllByTestId('row').length).toEqual(14);
})

test('Sorting returns sorted rows', async () => {
  const { getByText, getBySelectText } = renderComponent()
  await wait(() => getBySelectText('2017-01-02'));
  fireEvent.click(getByText('Price'))
  await wait(() => getByText('BTC'));

  fireEvent.click(getByText('Price'))
  await wait(() => getByText('BYR'));
})