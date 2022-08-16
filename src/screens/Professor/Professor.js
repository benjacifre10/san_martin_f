import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ModalProfessor from './Modal/ModalProfessor';
import Table from '../../components/Table/Table';
import Notification from '../../components/Notification/Notification';

import { useGlobal } from '../../context/Global/GlobalProvider';
import { getProfessor, addProfessor, deleteProfessor, updateProfessor } from '../../context/Global/actions/ProfessorActions';

import styles from './Professor.module.css';

const Professor = () => {

  const [globalState, globalDispatch] = useGlobal();
  const [show, setShow] = useState(false);
  const [dataRow, setDataRow] = useState('');
  const [dataProfessors, setDataProfessors] = useState([]);
  const [error, setError] = useState(null);

  const showError = (message, type) => {
    message ?
    setError(
      <Notification 
        message={message}
        type={type}
        show={showError}
      />  
    ) :
    setError(null);
  };

  const getAllProfessors = async () => {
    const result = await getProfessor(globalDispatch);
    setDataProfessors(result);
    return; 
  };

  const buildNotification = (result) => {
    switch (result.code) {
      case 199:
        showError(result.message, 'warning');
        break;
      case 200:
      case 201:
        showError(result.message, 'success');
        break;
      case 400:
        showError(result.message, 'danger');
        break; 
      default:
        break;
    }
  };

  useEffect(() => {
    setDataProfessors(getAllProfessors(globalDispatch));
  }, []);

  useEffect(() => {
    setDataProfessors(globalState.professors);
  }, [globalState]);

  const saveEventHandler = async (e) => {
    const result = e.ID === '' ?
      await addProfessor(globalDispatch, e) :
      await updateProfessor(globalDispatch, e);
   
    buildNotification(result); 
    setDataProfessors(getAllProfessors(globalDispatch));
    setShow(current => !current);
    setDataRow('');
  };

  const addProfessorEvent = () => {
    setShow(current => !current);
  };

  const closeProfessorEvent = () => {
    setDataRow('');
    setShow(current => !current);
  };

  const tableEvents = async (e, d) => { 
    if (e === 'edit') {
      setDataRow(d);
      setShow(current => !current);
    }
    if (e === 'delete') {
      const result = await deleteProfessor(globalDispatch, d);
      buildNotification(result); 
    }
  }

  return (
    <React.Fragment>
      <Container className={styles.container}>
        { error }
        <Row>
          <h1>Profesores</h1>
        </Row>
        <hr />
        <br />
        <Row className="justify-content-center">
          <Col xs lg="4">
              <Button 
                className="w-100"
                variant="primary"
                size="xs"
                onClick={() => addProfessorEvent()}
              >
                Agregar
              </Button>
          </Col>
        </Row>
        <br />  
        <Row>
          <Col xs lg="2"></Col>
          <Col>
            <Table
              key={'professor'}
              tableEvents={(e, d) => tableEvents(e, d)}
              data={dataProfessors}
              actions={'ed'}
            /> 
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
      <ModalProfessor 
        show={show}
        handleClose={closeProfessorEvent}
        saveEvent={(e) => saveEventHandler(e)}
        data={dataRow || ''}
      />
    </React.Fragment>
  );
};

export default Professor;

