import React from 'react';
import { Modal } from 'react-bootstrap';

import FormTestNote from '../Form/FormTestNote';

const ModalTestNote = ({show, handleClose, saveEvent, data}) => {

  const eventHandler = (e) => {
    saveEvent(e);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Nota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormTestNote 
          dataEntry={data}
          saveData={(e) => eventHandler(e)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalTestNote;

