import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class InstrumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = { currency: props.currency };
  }

  render() {
    const { currency, handleCloseModal, chartData } = this.props;
    return (
      <Modal isOpen={true} toggle={handleCloseModal} className="modal-lg modal-instrument modal-dialog-centered">
        <ModalHeader toggle={handleCloseModal}>
          {currency} Currency  details
        </ModalHeader>
        <ModalBody>
          <LineChart width={770} height={400} data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
          </LineChart>
        </ModalBody>
      </Modal>
    )
  }
}

export default InstrumentModal;