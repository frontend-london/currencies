import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class InstrumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = { currency: props.currency };
  }



  render() {
    const { currency, handleCloseModal } = this.props;
    return (
      <Modal isOpen={true} toggle={handleCloseModal} className="modal-lg flight-details">
        <ModalHeader toggle={handleCloseModal}>
          Currency {currency} details
        </ModalHeader>
        <ModalBody>
          @todo
        </ModalBody>
      </Modal>
    )
  }
}

export default InstrumentModal;