import React, { Component } from 'react';
import TableHeader from './tableHeader';
import Row from './row';
import Pagination from './pagination';

class InstrumentsTable extends Component {
  render() {
    const { sortBy, sortUp, perPage, activePage, changes, handleHeaderClick, handlePageChange, handlePerPageChange } = this.props;
    return (
      <table>
        <thead>
          <TableHeader sortBy={sortBy} sortUp={sortUp} handleHeaderClick={handleHeaderClick} />
        </thead>
        <tbody>
          {changes.slice(perPage * (activePage - 1), perPage * activePage).map((row, i) =>
            <Row
              row={row}
              key={row.currency}
            />
          )}
        </tbody>
        <tfoot>
          <Pagination
            activePage={activePage}
            perPage={perPage}
            changesLength={changes.length}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
          />
        </tfoot>
      </table>
    )
  }
}

export default InstrumentsTable;