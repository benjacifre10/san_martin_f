import React from 'react';
import { Modal } from 'react-bootstrap';

import FormProfessor from '../Form/FormProfessor';

const ModalProfessor = ({show, handleClose, saveEvent, data}) => {

  const eventHandler = (e) => {
    saveEvent(e);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ data ? 'Editar Profesor' : 'Agregar Profesor'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProfessor 
          dataEntry={data}
          saveData={(e) => eventHandler(e)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalProfessor;

