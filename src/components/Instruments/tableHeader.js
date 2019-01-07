import React, { Component } from 'react';

class InstrumentsTableHeader extends Component {
  render() {
    return (
      <tr>
        <th className={this.props.getHeaderClassName('currency')} onClick={(e) => this.props.handleHeaderClick(e, 'currency')}>Currency</th>
        <th className={this.props.getHeaderClassName('rate')} onClick={(e) => this.props.handleHeaderClick(e, 'rate')}>Price</th>
        <th className={this.props.getHeaderClassName('change')} onClick={(e) => this.props.handleHeaderClick(e, 'change')}>Change</th>
      </tr>
    )
  }
}

export default InstrumentsTableHeader;