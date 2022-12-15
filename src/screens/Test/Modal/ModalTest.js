import React from 'react';
import { Modal } from 'react-bootstrap';

import TestForm from '../Form/TestForm';

const ModalTest = ({show, handleClose, saveEvent, data}) => {

  const eventHandler = (e) => {
    saveEvent(e);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Examen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TestForm 
          dataEntry={data}
          saveData={(e) => eventHandler(e)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalTest;

