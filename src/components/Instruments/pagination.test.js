import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library'
import Pagination from './pagination';

const PER_PAGE = 15;

beforeEach(function () {
  global.handlePageChange = jest.fn(() => { });
  global.handlePerPageChange = jest.fn(() => { });
});

afterEach(cleanup)

const renderComponent = (perPage) => render(<table><tbody><Pagination
  activePage="1"
  perPage={perPage}
  changesLength="50"
  handlePageChange={handlePageChange}
  handlePerPageChange={handlePerPageChange}
/></tbody></table>)


test('Pagination settings are displayed correctly', () => {
  const { getByText, getBySelectText } = renderComponent(PER_PAGE)
  getBySelectText('15 per page')
  getByText('of 50')
})

test('Pagination is displayed when number of items >= perPage', () => {
  const { getByText } = renderComponent(PER_PAGE)
  getByText('»')
})

test('Pagination is not displayed when number of items < perPage', () => {
  const { queryByText } = renderComponent(80)
  expect(queryByText('»')).toBeNull()
})

test('Page change handler triggered', () => {
  const { getByText } = renderComponent(PER_PAGE)
  fireEvent.click(getByText('2'))
  expect(handlePageChange).toHaveBeenCalledTimes(1);
})

test('Per page change handler triggered', () => {
  const { getBySelectText } = renderComponent(PER_PAGE)
  fireEvent.change(getBySelectText('15 per page'), { target: { value: '10' } })
  expect(handlePerPageChange).toHaveBeenCalledTimes(1);
})

