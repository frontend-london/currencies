import React, { Component } from 'react';
import * as api from '../../api';
import InstrumentsRow from './row';
import Pagination from "react-js-pagination";

const Header = (props) => {
  return <header className="header">
    <span className="headerTitle">Currencies on</span>
    <select value={props.currentDate} className="currentDate custom-select" onChange={props.handleCurrentDateChange}>
      {Object.keys(props.days).slice(1).map((row, i) => 
        <option key={row}>{row}</option>
      )}
      </select>
  </header>
}

const Search = (props) => {
  return <div className="search">
    <form className="form-inline">
      <label className="sr-only" htmlFor="currencyName">Find currency</label>
      <input type="text" className="form-control mb-2 mr-sm-2 currencyName" id="currencyName" placeholder="E.g. GBP,EUR,PLN" onChange={props.handleCurrencyNameChange} />
      <select defaultValue={props.perPage} className="selectPagination mb-2 mr-sm-2 custom-select" onChange={props.handlePerPageChange}>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
        <option value="40">40 per page</option>
        <option value="80">80 per page</option>
      </select> 
      <span className="currencyCounter">
        of {props.changesLength}
      </span>
    </form>
  </div>
}

const Nav = (props) => {
  return <nav className="dayNav" role="group" aria-label="Change date">
    {props.currentDate !== Object.keys(props.days)[1] && (
      <button type="button" className="btn btn-primary" onClick={props.handlePrevDayClick}>&larr; Previous day</button>
    )}
    {props.currentDate !== Object.keys(props.days)[Object.keys(props.days).length - 1] && (
      <button type="button" className="btn btn-primary" onClick={props.handleNextDayClick}>Next day &rarr;</button>
    )}
  </nav>;
}

const TableHeader = (props) => {
  return <tr>
    <th className={props.getHeaderClassName('currency')} onClick={(e) => props.handleHeaderClick(e, 'currency')}>Currency</th>
    <th className={props.getHeaderClassName('rate')} onClick={(e) => props.handleHeaderClick(e, 'rate')}>Price</th>
    <th className={props.getHeaderClassName('change')} onClick={(e) => props.handleHeaderClick(e, 'change')}>Change</th>
  </tr>;
}

class Instruments extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      days: [], 
      activePage: 1,
      sortBy: 'currency', 
      currentDate: '', 
      minDate: null,
      maxDate: null,
      sortUp: false, 
      search: null,
      perPage: 15
    };
    this.fetchUpdates();
  }

  formatDate(date) {
    return date.toISOString().slice(0,10);
  }

  getPrevDay(date) {    
    if (!date) {
      return false;
    }
    let prev  = new Date(date);
    prev.setDate(prev.getDate() - 1);
    return this.formatDate(prev);
  }
  
  getNextDay(date) {
    if (!date) {
      return false;
    }
    let next  = new Date(date);
    next.setDate(next.getDate() + 1);
    return this.formatDate(next);
  }

  compareChanges = (a, b) => {
    let result = false;
    switch (this.state.sortBy) {
      case 'currency':
        result = a.currency - b.currency;
        break;
      case 'rate':
        result = a.rate - b.rate;
        break;
      case 'change':
        result = a.perChange - b.perChange;
        break;
      default:
        break;
    }

    return result;      
  }

  getChanges = ()  => {
    let prevDate = this.getPrevDay(this.state.currentDate),
      prevDay = this.state.days[prevDate],
      search = this.state.search,
      currDay = this.state.days[this.state.currentDate],
      changes = [];

    if (prevDay) {
      Object.keys(prevDay.rates).forEach((currency,index) => {
        let rate = currDay.rates[currency],
          change = rate - prevDay.rates[currency],
          perChange = (change / prevDay.rates[currency]) * 100,
          classNameId = Math.min(Math.round(Math.abs(perChange)), 8),
          className = 'price ' + ((change > 0) ? 'price-up--' + classNameId : (change < 0) ? 'price-down--' + classNameId : '');
          
          if (!search || search.split(',').find((el) => {
            return currency.includes(el);
          })) {
            changes.push({className, currency, rate, change, perChange});  
          }
      });

      changes.sort(this.compareChanges);
      if (this.state.sortUp) {
        changes.reverse();   
      }
    }
    return changes;
  }

  async fetchUpdates() {
    let days = await api.get('currencies.json', this.handleFetchUpdatesError);  
    this.setState({ days: days, currentDate: Object.keys(days)[1] });
  }

  handleFetchUpdatesError = (err) => {
    console.info('Error', err);
  }

  handlePrevDayClick = (e) => {
    e.preventDefault();
    this.setState({currentDate: this.getPrevDay(this.state.currentDate)});
  }

  handleNextDayClick = (e) => {
    e.preventDefault();
    this.setState({currentDate: this.getNextDay(this.state.currentDate)});
  }

  handleHeaderClick = (e, header) => {
    e.preventDefault();
    if (header === this.state.sortBy) {
      this.setState({sortUp: !this.state.sortUp});
    } else {
      this.setState({sortBy: header});
    }
  }

  getHeaderClassName = (header) => {
    let className = '';
    if (this.state.sortBy === header) {
      className = 'active';

      if (this.state.sortUp) {
        className+= ' up';
      }
    } 
    return className;
  }

  handleCurrencyNameChange = (e) => {
    this.setState({activePage: 1, search: e.currentTarget.value.toUpperCase()})
  }

  handlePageChange = (page) => {
    this.setState({activePage: page})
  }

  handlePerPageChange = (e) => {
    this.setState({perPage: parseInt(e.currentTarget.value)});
  }

  handleCurrentDateChange = (e) => {
    this.setState({currentDate: e.currentTarget.value});
  }

  render() {
    const changes = this.getChanges();

    return (
      <div>
        <Header currentDate={this.state.currentDate} handleCurrentDateChange={this.handleCurrentDateChange} days={this.state.days} />

        <Search handleCurrencyNameChange={this.handleCurrencyNameChange} perPage={this.perPage} handlePerPageChange={this.handlePerPageChange} changesLength={changes.length} />

        <Nav currentDate={this.state.currentDate} days={this.state.days} handlePrevDayClick={this.handlePrevDayClick} handleNextDayClick={this.handleNextDayClick} />

        <table>
          <thead>
            <TableHeader getHeaderClassName={this.getHeaderClassName} handleHeaderClick={this.handleHeaderClick} />    
          </thead>
          <tbody>
            {changes.slice(this.state.perPage * (this.state.activePage - 1), this.state.perPage * this.state.activePage).map((row, i) => 
              <InstrumentsRow
                row={row}
                key={row.currency}
              />
            )}
          </tbody>
          {(changes.length > this.state.perPage) && (
            <tfoot>
              <tr>
                <td colSpan="3">
                  <nav className="currencies-pages">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.perPage}
                      totalItemsCount={changes.length}
                      onChange={(pageNumber) => this.handlePageChange(pageNumber)}
                      pageRangeDisplayed={5}
                      hideDisabled={true}
                      nextPageText="&raquo;"
                      prevPageText="&laquo;"
                      hideFirstLastPages={true}
                      itemClass="page-item"
                      linkClass="page-link"
                      innerClass="pagination justify-content-center"
                    />
                  </nav>
                </td>
              </tr>
            </tfoot>
          )}
        </table>

      </div>
    )
  }
}

export default Instruments;