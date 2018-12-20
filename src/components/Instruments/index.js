import React, { Component } from 'react';
import * as api from '../../api';
import InstrumentsRow from './row';

class Instruments extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      days: [], 
      sortBy: 'currency', 
      currentDate: null, 
      minDate: null,
      maxDate: null,
      sortUp: false 
    };
    this.fetchUpdates();
  }

  formatDate(date) {
    return date.toISOString().slice(0,10);
  }

  getPrevDay(date) {    
    let prev  = new Date(date);
    prev.setDate(prev.getDate() - 1);
    return this.formatDate(prev);
  }
  
  getNextDay(date) {
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
      currDay = this.state.days[this.state.currentDate],
      changes = [];

    if (prevDay) {
      Object.keys(prevDay.rates).forEach((currency,index) => {
        let rate = currDay.rates[currency],
          change = rate - prevDay.rates[currency],
          perChange = (change / prevDay.rates[currency]) * 100,
          classNameId = Math.min(Math.round(Math.abs(perChange)), 8),
          className = 'price ' + ((change > 0) ? 'price-up--' + classNameId : (change < 0) ? 'price-down--' + classNameId : '');
          
        changes.push({className, currency, rate, change, perChange});
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

  render() {
    let changes = this.getChanges();

    return (
      <div>
        <h2>Currencies on {this.state.currentDate}</h2>
        <div className="dayNav">
          {this.state.currentDate !== Object.keys(this.state.days)[1] && (
            <button onClick={this.handlePrevDayClick}>&larr; Previous day</button>
          )}
          {this.state.currentDate !== Object.keys(this.state.days)[Object.keys(this.state.days).length - 1] && (
            <button onClick={this.handleNextDayClick}>Next day &rarr;</button>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th className={this.getHeaderClassName('currency')} onClick={(e) => this.handleHeaderClick(e, 'currency')}>Currency</th>
              <th className={this.getHeaderClassName('rate')} onClick={(e) => this.handleHeaderClick(e, 'rate')}>Price</th>
              <th className={this.getHeaderClassName('change')} onClick={(e) => this.handleHeaderClick(e, 'change')}>Change</th>
            </tr>
          </thead>
          <tbody>
            {changes.map((row, i) => 
              <InstrumentsRow
                row={row}
                key={row.currency}
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Instruments;