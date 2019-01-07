import React, { Component } from 'react';

class InstrumentsHeader extends Component {
  render() {
    return (
      <header className="header">
        <label htmlFor="currenciesDate" className="headerTitle">Currencies on</label>
        <select id="currenciesDate" value={this.props.currentDate} className="currentDate custom-select" onChange={this.props.handleCurrentDateChange}>
          {Object.keys(this.props.days).slice(1).map((row, i) =>
            <option key={row}>{row}</option>
          )}
        </select>
      </header>
    )
  }
}

export default InstrumentsHeader;