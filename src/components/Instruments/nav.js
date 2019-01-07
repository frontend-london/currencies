import React, { Component } from 'react';

class InstrumentsNav extends Component {
  render() {
    return (
      <nav className="dayNav" role="group" aria-label="Change date">
        {this.props.currentDate && this.props.currentDate !== Object.keys(this.props.days)[1] && (
          <button type="button" className="btn btn-primary" onClick={this.props.handlePrevDayClick}>&larr; Previous day</button>
        )}
        {this.props.currentDate && this.props.currentDate !== Object.keys(this.props.days)[Object.keys(this.props.days).length - 1] && (
          <button type="button" className="btn btn-primary" onClick={this.props.handleNextDayClick}>Next day &rarr;</button>
        )}
      </nav>
    )
  }
}

export default InstrumentsNav;