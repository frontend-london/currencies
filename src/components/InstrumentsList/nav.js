import React from 'react';

function InstrumentsNav(props) {
  const { currentDate, days, handlePrevDayClick, handleNextDayClick } = props;
  return (
    <nav className="dayNav" role="group" aria-label="Change date">
      {currentDate && currentDate !== Object.keys(days)[1] && (
        <button type="button" className="btn btn-primary" onClick={handlePrevDayClick}>&larr; Previous day</button>
      )}
      {currentDate && currentDate !== Object.keys(days)[Object.keys(days).length - 1] && (
        <button type="button" className="btn btn-primary" onClick={handleNextDayClick}>Next day &rarr;</button>
      )}
    </nav>
  )
}

export default InstrumentsNav;