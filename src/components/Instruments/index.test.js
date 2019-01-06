import React from 'react';
import { render, fireEvent, cleanup, waitForElement, waitForDomChange, wait } from 'react-testing-library'
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

test('Pagination is displayed correct after render', async () => {
  const { getBySelectText } = renderComponent()
  getBySelectText(PER_PAGE + ' per page')
})

test('Date select is set correctly', async () => {
  const { getBySelectText } = renderComponent()
  await wait(() => getBySelectText('2017-01-02'))
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith(API_URL)
})

test('Currencies counter is displayed correctly', async () => {
  const { getByText } = renderComponent()
  await wait(() => getByText('of 59'))
})

test('Previous day button visibility tests', async () => {
  const { getByText, queryByText } = renderComponent()

  // test that buttons are not visible on page load
  expect(queryByText(/Next day/i)).toBeNull()
  expect(queryByText(/Previous day/i)).toBeNull()

  // test that only next button get visible after currencies are fetched
  await waitForElement(() => getByText(/Next day/i))
  expect(queryByText(/Previous day/i)).toBeNull()


  // click next button
  // test that both are visible
  // go to last day
  // test that only prev button is visible
})

test('Next day button visibility tests', async () => {

})



test('Sorting tests', async () => {

})

test('Pagination tests', async () => {

})

test('Search field tests', async () => {

})

test('Correct classes for change row', async () => {

})

// test select updates
// test input change
// test every button clicked