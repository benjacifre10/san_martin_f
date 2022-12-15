import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ModalTest from './Modal/ModalTest';
import Table from '../../components/Table/Table';
import Notification from '../../components/Notification/Notification';

import { useGlobal } from '../../context/Global/GlobalProvider';
import { getProfessor } from '../../context/Global/actions/ProfessorActions';
import { getTestType } from '../../context/Global/actions/TestTypeActions';
import { getStudyPlan } from '../../context/Global/actions/StudyPlanActions';
import { addTest, getTest, deleteTest } from '../../context/Global/actions/TestActions';

import styles from './Test.module.css';

const Test = () => {

  const [globalState, globalDispatch] = useGlobal();

  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const [tests, setTests] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [testtypes, setTesttypes] = useState(null);
  const [studyplans, setStudyplans] = useState(null);

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

  const getInitialInfo = async () => {
    setTests(await getTest(globalDispatch));
    setProfessors(await getProfessor(globalDispatch));
    setTesttypes(await getTestType(globalDispatch));
    setStudyplans(await getStudyPlan(globalDispatch));
    return;
  };

  useEffect(() => {
    getInitialInfo();
  }, []);

  useEffect(() => {
    setTests(globalState.test);
  }, [globalState]);

  const addTestEvent = () => {
    setShow(current => !current);
  };

  const closeTestEvent = () => {
    setShow(current => !current);
  };

  const saveEventHandler = async (e) => {
    const result = await addTest(globalDispatch, e);
    buildNotification(result); 
    setTests(getTest(globalDispatch));
    setShow(current => !current);
  };

  const tableEvents = async (e, d) => { 
    if (e === 'delete') {
      const result = await deleteTest(globalDispatch, d);
      buildNotification(result); 
    }
  }

  return (
    <React.Fragment>
      <Container className={styles.container}>
        { error }
        <Row>
          <h1>Examenes</h1>
        </Row>
        <hr />
        <br />
        <Row className="justify-content-center">
          <Col xs lg="4">
              <Button 
                className="w-100"
                variant="primary"
                size="xs"
                onClick={() => addTestEvent()}
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
              key={'test'}
              tableEvents={(e, d) => tableEvents(e, d)}
              data={tests}
              actions={'d'}
            /> 
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
      <ModalTest 
        show={show}
        handleClose={closeTestEvent}
        saveEvent={(e) => saveEventHandler(e)}
        data={{professors, testtypes, studyplans}}
      />
    </React.Fragment>
  ); 
};

export default Test;
