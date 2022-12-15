import React from 'react';
import { Modal } from 'react-bootstrap';

import FormEnrollSubject from '../Form/FormEnrollSubject';

const ModalEnrollSubject = ({show, handleClose, saveEvent, data = null}) => {

  const eventHandler = (e) => {
    saveEvent(e);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Inscribir Materia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormEnrollSubject 
          dataEntry={data}
          saveData={(e) => eventHandler(e)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalEnrollSubject;

