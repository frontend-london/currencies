import React from 'react';
import { render, cleanup } from 'react-testing-library'
import Row from './row';

beforeEach(function () {
  global.handleHeaderClick = jest.fn(() => { });
});

afterEach(cleanup)

const row = {
  currency: "BOB",
  className: '',
  rate: 6.933441,
  perChange: 0.1111126
}

const renderComponent = () => render(<table><tbody>
  <Row
    row={row}
    key={row.currency}
  />
</tbody></table>)

test('Table row rendered with rounded change', () => {
  const { getByText } = renderComponent()
  getByText(/0.111113/i)
})
