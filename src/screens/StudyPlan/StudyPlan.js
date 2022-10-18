import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ModalStudyPlan from './Modal/ModalStudyPlan';
import ModalCorrelatives from './Modal/ModalCorrelatives';
import Table from '../../components/Table/Table';
import Notification from '../../components/Notification/Notification';

import { useGlobal } from '../../context/Global/GlobalProvider';
import { getStudyPlan, addStudyPlan, changeStateStudyPlan, updateStudyPlan } from '../../context/Global/actions/StudyPlanActions';
import { getSubjectsXStudyPlan, addSubjectsXStudyPlan, deleteSubjectsXStudyPlan } from '../../context/Global/actions/SubjectXStudyPlanActions';
import { getCorrelative, addCorrelative, deleteCorrelative } from '../../context/Global/actions/CorrelativeActions';

import { addPropertyToStudyPlan } from '../../utils/addProperties';

import styles from './StudyPlan.module.css';

const StudyPlan = () => {

  const [globalState, globalDispatch] = useGlobal();
  const [show, setShow] = useState(false);
  const [showCorrelatives, setShowCorrelatives] = useState(false);
  const [dataRow, setDataRow] = useState('');
  const [dataStudyPlans, setDataStudyPlans] = useState([]);
  const [dataSubjectsXStudyPlans, setDataSubjectsXStudyPlans] = useState([]);
  const [dataCorrelatives, setDataCorrelatives] = useState([]);
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
    if (result) {
      const data = addPropertyToStudyPlan(result);
      setDataStudyPlans(data);
    }
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

  const saveEventCorrelativesHandler = async (e) => {
   
    await deleteCorrelative(globalDispatch, e.studyPlanId);
    await deleteSubjectsXStudyPlan(globalDispatch, e.studyPlanId);
    // inserto las de primer anio
    if (e.correlatives.firstYearSubjectData.length > 0) {
      for (const c of e.correlatives.firstYearSubjectData) {
        const subjectXStudyPlanData = {
          StudyPlanId: e.studyPlanId,
          SubjectId: c.subject.value
        };
        const result = await addSubjectsXStudyPlan(globalDispatch, subjectXStudyPlanData);
        const correlativesData = {
          year: c.year.value,
          correlative: c.correlatives ? c.correlatives.map(cor => cor.value) : [],
          subjectxstudyplanid: result.data
        };
        const resultCorrelative = await addCorrelative(globalDispatch, correlativesData);
        // creo una bandera al principio del metodo y verifico el resultado, si alguno esta mal muestro el cartel
        // sino muestro el cartel de que esta todo bien
        buildNotification(resultCorrelative);
      };
    }
    
    // inserto las de segundo anio
    if (e.correlatives.secondYearSubjectData.length > 0) {
      for (const c of e.correlatives.secondYearSubjectData) {
        const subjectXStudyPlanData = {
          StudyPlanId: e.studyPlanId,
          SubjectId: c.subject.value
        };
        const result = await addSubjectsXStudyPlan(globalDispatch, subjectXStudyPlanData);
        const correlativesData = {
          year: c.year.value,
          correlative: c.correlatives ? c.correlatives.map(cor => cor.value) : [],
          subjectxstudyplanid: result.data
        };
        const resultCorrelative = await addCorrelative(globalDispatch, correlativesData);
        // creo una bandera al principio del metodo y verifico el resultado, si alguno esta mal muestro el cartel
        // sino muestro el cartel de que esta todo bien
        buildNotification(resultCorrelative);
      };
    }

    // inserto las de tercer anio
    if (e.correlatives.thirdYearSubjectData.length > 0) {
      for (const c of e.correlatives.thirdYearSubjectData) {
        const subjectXStudyPlanData = {
          StudyPlanId: e.studyPlanId,
          SubjectId: c.subject.value
        };
        const result = await addSubjectsXStudyPlan(globalDispatch, subjectXStudyPlanData);
        const correlativesData = {
          year: c.year.value,
          correlative: c.correlatives ? c.correlatives.map(cor => cor.value) : [],
          subjectxstudyplanid: result.data
        };
        const resultCorrelative = await addCorrelative(globalDispatch, correlativesData);
        // creo una bandera al principio del metodo y verifico el resultado, si alguno esta mal muestro el cartel
        // sino muestro el cartel de que esta todo bien
        buildNotification(resultCorrelative);
      };
    }

    setShowCorrelatives(current => !current);
    setDataRow('');
    setDataSubjectsXStudyPlans([]);
  };

  const addStudyPlanEvent = () => {
    setShow(current => !current);
  };

  const closeStudyPlanEvent = () => {
    setDataRow('');
    setShow(current => !current);
  };

  const addCorrelatives = async (d) => {
    setDataRow(d);
    // aca llamo al subjectxplan by studyplanid
    const subjectsxstudyplanResult = await getSubjectsXStudyPlan(globalDispatch, d);
    setDataSubjectsXStudyPlans(subjectsxstudyplanResult); 
    const correlativesResult = await getCorrelative(globalDispatch, d);
    setDataCorrelatives(correlativesResult); 
    setShowCorrelatives(current => !current);
  };

  const closeCorrelatives = () => {
    setShowCorrelatives(current => !current);
  };

  const tableEvents = async (e, d) => { 
    if (e === 'search') {
      addCorrelatives(d);
    }
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
      <ModalCorrelatives 
        show={showCorrelatives}
        handleClose={closeCorrelatives}
        saveEvent={(e) => saveEventCorrelativesHandler(e)}
        data={{dataRow, dataSubjectsXStudyPlans, dataCorrelatives} || ''}
      />
    </React.Fragment>
  );
};

export default StudyPlan;
