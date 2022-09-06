import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ModalSubject from './Modal/ModalSubject';
import Table from '../../components/Table/Table';
import Notification from '../../components/Notification/Notification';

import { useGlobal } from '../../context/Global/GlobalProvider';
import { getSubject, addSubject, updateSubject, deleteSubject } from '../../context/Global/actions/SubjectActions';

import styles from './Subject.module.css';

const Subject = () => {


  const [globalState, globalDispatch] = useGlobal();
  const [show, setShow] = useState(false);
  const [dataRow, setDataRow] = useState('');
  const [dataSubjects, setDataSubjects] = useState([]);
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

  const getAllSubjects = async () => {
    const result = await getSubject(globalDispatch);
    setDataSubjects(result);
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
    setDataSubjects(getAllSubjects(globalDispatch));
  }, []);

  useEffect(() => {
    setDataSubjects(globalState.subjects);
  }, [globalState]);

  const saveEventHandler = async (e) => {
    const result = e.ID === '' ?
      await addSubject(globalDispatch, e) :
      await updateSubject(globalDispatch, e);

    buildNotification(result); 
    setDataSubjects(getAllSubjects(globalDispatch));
    setShow(current => !current);
    setDataRow('');
  };

  const addSubjectEvent = () => {
    setShow(current => !current);
  };

  const closeSubjectEvent = () => {
    setDataRow('');
    setShow(current => !current);
  };

  const tableEvents = async (e, d) => { 
    if (e === 'edit') {
      setDataRow(d);
      setShow(current => !current);
    }
    if (e === 'delete') {
      const result = await deleteSubject(globalDispatch, d);
      buildNotification(result); 
    }
  }

  return (
    <React.Fragment>
      <Container className={styles.container}>
        { error }
        <Row>
          <h1>Materias</h1>
        </Row>
        <hr />
        <br />
        <Row className="justify-content-center">
          <Col xs lg="4">
              <Button 
                className="w-100"
                variant="primary"
                size="xs"
                onClick={() => addSubjectEvent()}
              >
                Agregar
              </Button>
          </Col>
        </Row>
        <br />  
        <Row>
          <Col xs lg="1"></Col>
          <Col>
            <Table
              key={'subject'}
              tableEvents={(e, d) => tableEvents(e, d)}
              data={dataSubjects}
              actions={'ed'}
            /> 
          </Col>
          <Col xs lg="1"></Col>
        </Row>
      </Container>
      <ModalSubject 
        show={show}
        handleClose={closeSubjectEvent}
        saveEvent={(e) => saveEventHandler(e)}
        data={dataRow || ''}
      />
    </React.Fragment>
  );
};

export default Subject;

