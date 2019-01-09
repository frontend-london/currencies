import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library'
import Pagination from './pagination';

beforeEach(function () {
  global.handlePageChange = jest.fn(() => { });
  global.handlePerPageChange = jest.fn(() => { });
});

afterEach(cleanup)

const renderComponent = () => render(<table><tbody><Pagination
  activePage="1"
  perPage="15"
  changesLength="50"
  handlePageChange={handlePageChange}
  handlePerPageChange={handlePerPageChange}
/></tbody></table>)


test('Pagination is displayed correctly', () => {
  const { getByText, getBySelectText } = renderComponent()
  getBySelectText('15 per page')
  getByText('of 50')
})

test('Page change handler triggered', () => {
  const { getByText } = renderComponent()
  fireEvent.click(getByText('2'))
  expect(handlePageChange).toHaveBeenCalledTimes(1);
})

test('Per page change handler triggered', () => {
  const { getBySelectText } = renderComponent()
  fireEvent.change(getBySelectText('15 per page'), { target: { value: '10' } })
  expect(handlePerPageChange).toHaveBeenCalledTimes(1);
})

