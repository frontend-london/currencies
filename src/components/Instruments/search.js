import React, { Component } from 'react';

class InstrumentsSearch extends Component {
  render() {
    return (
      <form className="search form-inline">
        <label className="sr-only" htmlFor="currencyName">Find currency</label>
        <input type="text" className="form-control mb-2 mr-sm-2 currencyName" id="currencyName" placeholder="E.g. GBP,EUR,PLN" onChange={this.props.handleCurrencyNameChange} />
      </form>
    )
  }
}

export default InstrumentsSearch;