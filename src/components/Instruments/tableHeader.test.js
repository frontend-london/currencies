import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library'
import TableHeader from './tableHeader';

beforeEach(function () {
  global.handleHeaderClick = jest.fn(async () => { });
});

afterEach(cleanup)

const renderComponent = () => render(<table><thead>
  <TableHeader sortUp={true} sortBy="change" handleHeaderClick={handleHeaderClick} />
</thead></table>)

test('Table header click triggered', () => {
  const { getByText } = renderComponent()
  fireEvent.click(getByText('Price'))
  expect(handleHeaderClick).toHaveBeenCalledTimes(1);
})

test('Table column selected', () => {
  const { getByText } = renderComponent()
  expect(getByText('Change').className).toEqual('active up');
  expect(getByText('Currency').className).toEqual('');
})
