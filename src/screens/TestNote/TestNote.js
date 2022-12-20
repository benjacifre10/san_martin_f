import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ModalTestNote from './Modal/ModalTestNote';
import Table from '../../components/Table/Table';
import Notification from '../../components/Notification/Notification';

import { useGlobal } from '../../context/Global/GlobalProvider';
import { getStudentTest, updateStudentTest } from '../../context/Global/actions/StudentXTestActions';
import { getStudentXSubjectsXStudyPlan, updateStudentXSubjectsXStudyPlan } from '../../context/Global/actions/StudentXSubjectXStudyPlanActions';
import { getStudents } from '../../context/Global/actions/StudentActions';

import styles from './TestNote.module.css';

const TestNote = () => {

  const [, globalDispatch] = useGlobal();
  const [show, setShow] = useState(false);
  const [dataRow, setDataRow] = useState('');
  const [dataStudentTest, setDataStudentTest] = useState(null);
  const [dataStudents, setDataStudents] = useState(null);
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

  const getInitialInfo = async () => {
    const result = await getStudentTest(globalDispatch);
    result.map(r => {
      delete r.date;
      r.note = r.note.length === 0 ? " " : r.note;
      return r;
    });
    setDataStudentTest(result);
    const students = await getStudents(globalDispatch);
    setDataStudents(students);
    return;
  }

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
    getInitialInfo();
  }, []);

  const saveEventHandler = async (e) => {
    const result = await updateStudentTest(globalDispatch, e);
   
    buildNotification(result); 
    getInitialInfo();
    const row = dataStudentTest.filter(d => d.ID === e.ID);
    if (row[0].test === "FINAL") {
      const student = dataStudents.filter(s => `${s.name} ${s.surname}` === row[0].student);
      const sxsxsp = await getStudentXSubjectsXStudyPlan(globalDispatch, student[0]);
      const stdxsbtxsp = sxsxsp.filter(s => s.subject === row[0].subject);
      const updatedSXSXSP = {
        ID: stdxsbtxsp[0].ID,
        finalnote: row[0].note
      };
      const result = await updateStudentXSubjectsXStudyPlan(globalDispatch, updatedSXSXSP);
      buildNotification(result);
      
    }
    setShow(current => !current);
    setDataRow('');
  };

  const closeStudentTestEvent = () => {
    setDataRow('');
    setShow(current => !current);
  };

  const tableEvents = async (e, d) => { 
    if (e === 'edit') {
      setDataRow(d);
      setShow(current => !current);
    }
  }

  return (
    <React.Fragment>
      <Container className={styles.container}>
        { error }
        <Row>
          <h1>Corregir Examenes</h1>
        </Row>
        <hr />
        <br />
        <Row>
          <Col xs lg="2"></Col>
          <Col>
            <Table
              key={'pursuetype'}
              tableEvents={(e, d) => tableEvents(e, d)}
              data={dataStudentTest}
              actions={'e'}
            /> 
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
      <ModalTestNote 
        show={show}
        handleClose={closeStudentTestEvent}
        saveEvent={(e) => saveEventHandler(e)}
        data={dataRow || ''}
      />
    </React.Fragment>
  );
};

export default TestNote;

