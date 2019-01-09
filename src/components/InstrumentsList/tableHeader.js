import React, { Component } from 'react';

class InstrumentsTableHeader extends Component {
  getHeaderClassName = (header) => {
    const { sortBy, sortUp } = this.props;
    let className = '';
    if (sortBy === header) {
      className = 'active';

      if (sortUp) {
        className += ' up';
      }
    }
    return className;
  }

  render() {
    const { handleHeaderClick } = this.props;
    return (
      <tr>
        <th className={this.getHeaderClassName('currency')} onClick={(e) => handleHeaderClick(e, 'currency')}>Currency</th>
        <th className={this.getHeaderClassName('rate')} onClick={(e) => handleHeaderClick(e, 'rate')}>Price</th>
        <th className={this.getHeaderClassName('change')} onClick={(e) => handleHeaderClick(e, 'change')}>Change</th>
      </tr>
    )
  }
}

export default InstrumentsTableHeader;