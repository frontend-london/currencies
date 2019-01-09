import React from 'react';
import { render, fireEvent, cleanup, wait } from 'react-testing-library'
import Table from './table';
import changes from './changes.test.json';

const PER_PAGE = 15;

beforeEach(function () {
  global.handleHeaderClick = jest.fn(() => { });
});

afterEach(cleanup)

const renderComponent = (sortBy, sortUp, perPage, activePage) => render(<Table sortBy={sortBy} sortUp={sortUp} perPage={perPage} activePage={activePage} changes={changes} handleHeaderClick={handleHeaderClick} />)

test('Table rendered with correct number of rows', async () => {
  const { getAllByTestId } = renderComponent('rate', false, PER_PAGE, 1)
  expect(getAllByTestId('row').length).toEqual(PER_PAGE);
})

test('Table rendered with correct sorting', async () => {
  const { getByText, getAllByTestId, queryByText } = renderComponent('rate', false, PER_PAGE, 1)
  const rows = getAllByTestId('row');
  getByText('0.000981356677', rows[0])
  getByText('1.44741', rows[14])
  expect(queryByText('0.1.7762')).toBeNull() // rows[15] not visible
})