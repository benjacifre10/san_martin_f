import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ModalStudyPlan from './Modal/ModalStudyPlan';
import Table from '../../components/Table/Table';
import Notification from '../../components/Notification/Notification';

import { useGlobal } from '../../context/Global/GlobalProvider';
import { getStudyPlan, addStudyPlan, changeStateStudyPlan, updateStudyPlan } from '../../context/Global/actions/StudyPlanActions';

import styles from './StudyPlan.module.css';

const StudyPlan = () => {

  const [globalState, globalDispatch] = useGlobal();
  const [show, setShow] = useState(false);
  const [dataRow, setDataRow] = useState('');
  const [dataStudyPlans, setDataStudyPlans] = useState([]);
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

  const getAllStudyPlans = async () => {
    const result = await getStudyPlan(globalDispatch);
    setDataStudyPlans(result);
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
    setDataStudyPlans(getAllStudyPlans(globalDispatch));
  }, []);

  useEffect(() => {
    setDataStudyPlans(globalState.studyplans);
  }, [globalState]);

  const saveEventHandler = async (e) => {
    const result = e.ID === '' ?
      await addStudyPlan(globalDispatch, e) :
      await updateStudyPlan(globalDispatch, e);
   
    buildNotification(result); 
    setDataStudyPlans(getAllStudyPlans(globalDispatch));
    setShow(current => !current);
    setDataRow('');
  };

  const addStudyPlanEvent = () => {
    setShow(current => !current);
  };

  const closeStudyPlanEvent = () => {
    setDataRow('');
    setShow(current => !current);
  };

  const tableEvents = async (e, d) => { 
    if (e === 'edit') {
      setDataRow(d);
      setShow(current => !current);
    }
    if (e === 'check') {
      d.state = !d.state;
      const result = await changeStateStudyPlan(globalDispatch, d);
      buildNotification(result); 
    }
  }

  return (
    <React.Fragment>
      <Container className={styles.container}>
        { error }
        <Row>
          <h1>Planes de Estudio</h1>
        </Row>
        <hr />
        <br />
        <Row className="justify-content-center">
          <Col xs lg="4">
              <Button 
                className="w-100"
                variant="primary"
                size="xs"
                onClick={() => addStudyPlanEvent()}
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
              key={'studyplan'}
              tableEvents={(e, d) => tableEvents(e, d)}
              data={dataStudyPlans}
              actions={'ec'}
            /> 
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
      <ModalStudyPlan 
        show={show}
        handleClose={closeStudyPlanEvent}
        saveEvent={(e) => saveEventHandler(e)}
        data={dataRow || ''}
      />
    </React.Fragment>
  );
};

export default StudyPlan;
