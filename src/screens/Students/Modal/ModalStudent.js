import React from 'react';
import { Modal } from 'react-bootstrap';

import FormStudent from '../Form/FormStudent';

const ModalStudent = ({show, handleClose, saveEvent, data}) => {

  const eventHandler = (e) => {
    saveEvent(e);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ data ? 'Editar Alumno' : 'Agregar Alumno'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormStudent 
          dataEntry={data}
          saveData={(e) => eventHandler(e)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalStudent;

