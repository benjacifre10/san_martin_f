import React from 'react';
import { Modal } from 'react-bootstrap';

import FormCorrelatives from '../Form/FormCorrelatives';

const ModalCorrelatives = ({show, handleClose, saveEvent, data}) => {

  const eventHandler = (e) => {
    saveEvent(e);
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Correlatividades</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormCorrelatives 
          dataEntry={data}
          saveData={(e) => eventHandler(e)}
        /> 
      </Modal.Body>
    </Modal>
  );
};

export default ModalCorrelatives;
