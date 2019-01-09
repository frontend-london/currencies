import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot, Area } from 'recharts';

class InstrumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = { currency: props.currency };
  }

  render() {
    const { currency, handleCloseModal, chartData, currentDate, currentPrice } = this.props;
    const currentDateData = {
      x: currentDate,
      y: currentPrice
    }
    return (
      <Modal isOpen={true} toggle={handleCloseModal} className="modal-lg modal-instrument modal-dialog-centered">
        <ModalHeader toggle={handleCloseModal}>
          {currency} Currency Chart
        </ModalHeader>
        <ModalBody>
          <AreaChart width={770} height={400} data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="rate" stroke="#007bff" fillOpacity={1} fill="url(#colorUv)" />
            {currentDateData && <ReferenceDot {...currentDateData} r={3} fill="#007bff" stroke="none" />}
          </AreaChart>
        </ModalBody>
      </Modal>
    )
  }
}

export default InstrumentModal;