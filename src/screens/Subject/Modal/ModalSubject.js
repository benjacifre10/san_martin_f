import React from 'react';
import { Modal } from 'react-bootstrap';

import FormSubject from '../Form/FormSubject';

const ModalSubject = ({show, handleClose, saveEvent, data}) => {

  const eventHandler = (e) => {
    saveEvent(e);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ data ? 'Editar Materia' : 'Agregar Materia'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormSubject 
          dataEntry={data}
          saveData={(e) => eventHandler(e)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalSubject;

