import React, { Component } from 'react';
import * as api from '../../api';
import Header from './header';
import Search from './search';
import Nav from './nav';
import Table from './table';
import ModalCurrency from '../InstrumentModal';


class Instruments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      days: [],
      activePage: 1,
      sortBy: 'currency',
      sortUp: false,
      currentDate: '',
      minDate: null,
      maxDate: null,
      search: null,
      modalCurrency: null,
      perPage: props.perPage,
      error: false
    };
    this.fetchUpdates();
  }

  formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  getPrevDay(date) {
    if (!date) {
      return false;
    }
    let prev = new Date(date);
    prev.setDate(prev.getDate() - 1);
    return this.formatDate(prev);
  }

  getNextDay(date) {
    if (!date) {
      return false;
    }
    let next = new Date(date);
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

  getChanges = () => {
    let prevDate = this.getPrevDay(this.state.currentDate),
      prevDay = this.state.days[prevDate],
      search = this.state.search,
      currDay = this.state.days[this.state.currentDate],
      changes = [];

    if (prevDay) {
      Object.keys(prevDay.rates).forEach((currency, index) => {
        let rate = currDay.rates[currency],
          change = rate - prevDay.rates[currency],
          perChange = (change / prevDay.rates[currency]) * 100,
          classNameId = Math.min(Math.round(Math.abs(perChange)), 8),
          className = 'price ' + ((change > 0) ? 'price-up--' + classNameId : (change < 0) ? 'price-down--' + classNameId : '');

        if (!search || search.split(',').find((el) => {
          return currency.includes(el);
        })) {
          changes.push({ className, currency, rate, change, perChange });
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
    let days = await api.get(this.props.api, this.handleFetchUpdatesError);
    this.setState({ days: days, currentDate: Object.keys(days)[1] });
  }

  handleFetchUpdatesError = (err) => {
    console.info('Error', this.props.api, err);
    this.setState({ error: true })
  }

  handlePrevDayClick = (e) => {
    e.preventDefault();
    this.setState({ currentDate: this.getPrevDay(this.state.currentDate) });
  }

  handleNextDayClick = (e) => {
    e.preventDefault();
    this.setState({ currentDate: this.getNextDay(this.state.currentDate) });
  }

  handleHeaderClick = (e, header) => {
    e.preventDefault();
    if (header === this.state.sortBy) {
      this.setState({ sortUp: !this.state.sortUp });
    } else {
      this.setState({ sortBy: header });
    }
  }

  handleCurrencyNameChange = (e) => {
    this.setState({ activePage: 1, search: e.currentTarget.value.toUpperCase() })
  }

  handlePageChange = (page) => {
    this.setState({ activePage: page })
  }

  handlePerPageChange = (e, changesLength) => {
    const perPage = parseInt(e.currentTarget.value);
    this.setState({ perPage });
    if ((this.state.activePage - 1) * perPage >= changesLength) {
      this.setState({ activePage: Math.ceil(changesLength / perPage) });
    }
  }

  handleCurrentDateChange = (e) => {
    this.setState({ currentDate: e.currentTarget.value });
  }

  handleShowCurrencyDetails = (modalCurrency) => {
    this.setState({ modalCurrency });
  }

  handleCloseModal = () => {
    this.setState({ modalCurrency: null });
  }

  getChartData = (currency) => {
    let data = [];
    Object.keys(this.state.days).forEach((day, index) => {
      let name = day;
      data.push({ name, rate: this.state.days[day].rates[currency] });
    });
    return data;
  }

  render() {
    const changes = this.getChanges();
    const { currentDate, days, sortBy, sortUp, perPage, activePage, error, modalCurrency } = this.state;

    return (
      <div>
        <Header currentDate={currentDate} handleCurrentDateChange={this.handleCurrentDateChange} days={days} />

        <Nav currentDate={currentDate} days={days} handlePrevDayClick={this.handlePrevDayClick} handleNextDayClick={this.handleNextDayClick} />

        <Search handleCurrencyNameChange={this.handleCurrencyNameChange} />

        <Table
          sortBy={sortBy}
          sortUp={sortUp}
          perPage={perPage}
          activePage={activePage}
          changes={changes}
          handlePageChange={this.handlePageChange}
          handleHeaderClick={this.handleHeaderClick}
          handlePerPageChange={this.handlePerPageChange}
          handleShowCurrencyDetails={this.handleShowCurrencyDetails}
        />

        {error && (
          <div className="error">Fetch Currencies Error - try again later</div>
        )}

        {modalCurrency && (
          <ModalCurrency
            currency={modalCurrency}
            handleCloseModal={this.handleCloseModal}
            chartData={this.getChartData(modalCurrency)}
            currentDate={currentDate}
            currentPrice={this.state.days[this.state.currentDate].rates[modalCurrency]}
          />
        )}
      </div>
    )
  }
}

export default Instruments;