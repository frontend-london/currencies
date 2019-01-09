import React, { Component } from 'react';
import Pagination from "react-js-pagination";

const PAGINATION_OPTIONS = [10, 15, 20, 40, 80];

class InstrumentsPagination extends Component {
  render() {
    const { changesLength, perPage, activePage, handlePageChange, handlePerPageChange } = this.props;
    return (
      <tr>
        <td colSpan="3" className="currencies-pages">
          {(changesLength > perPage) && (
            <Pagination
              activePage={activePage}
              itemsCountPerPage={perPage}
              totalItemsCount={changesLength}
              onChange={(pageNumber) => handlePageChange(pageNumber)}
              pageRangeDisplayed={5}
              hideDisabled={true}
              nextPageText="&raquo;"
              prevPageText="&laquo;"
              hideFirstLastPages={true}
              itemClass="page-item"
              linkClass="page-link"
              innerClass="pagination justify-content-center"
            />
          )}

          <form className="form-inline pagination-perpage">
            <select defaultValue={perPage} className="selectPagination mb-2 mr-sm-2 custom-select" onChange={(e) => handlePerPageChange(e, changesLength)}>
              {PAGINATION_OPTIONS.map(option =>
                <option value={option} key={option}>{option} per page</option>
              )}
            </select>
            <span className="currencyCounter">
              of {changesLength}
            </span>
          </form>
        </td>
      </tr>
    )
  }
}

export default InstrumentsPagination;