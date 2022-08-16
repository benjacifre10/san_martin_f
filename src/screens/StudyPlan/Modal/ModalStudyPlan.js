import React from 'react';
import { Modal } from 'react-bootstrap';

import FormStudyPlan from '../Form/FormStudyPlan';

const ModalStudyPlan = ({show, handleClose, saveEvent, data}) => {

  const eventHandler = (e) => {
    saveEvent(e);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ data ? 'Editar Plan de Estudio' : 'Agregar Plan de Estudio'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormStudyPlan 
          dataEntry={data}
          saveData={(e) => eventHandler(e)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalStudyPlan;
