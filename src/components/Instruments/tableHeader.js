import React, { Component } from 'react';

class InstrumentsTableHeader extends Component {
  getHeaderClassName = (header) => {
    let className = '';
    if (this.props.sortBy === header) {
      className = 'active';

      if (this.props.sortUp) {
        className += ' up';
      }
    }
    return className;
  }

  render() {
    return (
      <tr>
        <th className={this.getHeaderClassName('currency')} onClick={(e) => this.props.handleHeaderClick(e, 'currency')}>Currency</th>
        <th className={this.getHeaderClassName('rate')} onClick={(e) => this.props.handleHeaderClick(e, 'rate')}>Price</th>
        <th className={this.getHeaderClassName('change')} onClick={(e) => this.props.handleHeaderClick(e, 'change')}>Change</th>
      </tr>
    )
  }
}

export default InstrumentsTableHeader;