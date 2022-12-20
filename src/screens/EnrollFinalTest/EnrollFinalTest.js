import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Table from '../../components/Table/Table';
import Notification from '../../components/Notification/Notification';

import decodeToken from '../../utils/jwt';
import { useGlobal } from '../../context/Global/GlobalProvider';
import { getStudent } from '../../context/Global/actions/StudentActions';
import { getStudentXSubjectsXStudyPlan } from '../../context/Global/actions/StudentXSubjectXStudyPlanActions';
import { getTest } from '../../context/Global/actions/TestActions';
import { getStudentTest, addStudentTest } from '../../context/Global/actions/StudentXTestActions';

import styles from './EnrollFinalTest.module.css';

const EnrollFinalTest = () => {

  const [globalState, globalDispatch] = useGlobal();

  const [error, setError] = useState(null);

  const [tests, setTests] = useState(null);
  const [student, setStudent] = useState(null);
  const [studentxtest, setStudentxtest] = useState(null);
  const [studentxsubjectsxstudyplan, setStudentxsubjectsxstudyplan] = useState(null);
  const [finalData, setFinalData] = useState(null);

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
    const user = decodeToken(document.cookie);
    setTests(await getTest(globalDispatch));
    setStudent(await getStudent(globalDispatch, user.email));
    setStudentxtest(await getStudentTest(globalDispatch));
    return;
  };  

  const getFinalInfo = async () => {
    const result = (await getStudentXSubjectsXStudyPlan(globalDispatch, { ID: student[0].ID }));
    const finalResult = result.filter(r => r.approved !== true);
    setStudentxsubjectsxstudyplan(finalResult);
    return;
  };

  const buildData = () => {
    const finalTests = tests.filter(t => t.test === 'FINAL');
    finalTests.map(f => {
      f["note"] = " ";
      f["state"] = " ";
      delete f.sheet;
      delete f.form;
      return f;
    });
    const finalTestsXStudent = finalTests.filter((elem) => studentxsubjectsxstudyplan.find(({ subject }) => elem.subject === subject));
    const finalFinal = finalTestsXStudent.map(f => {
      let noteValue = "";
      const value = studentxtest.find(({ subject, note, date }) => {
        if (f.ID === date && f.subject === subject) {
          noteValue = note;
          return true;
        } else return false;
      });
      if (value) {
        if (noteValue.length > 0) {
          f.note = noteValue;
          f.state = parseInt(noteValue) > 3 ? "Aprobado" : "Desaprobado";
        } else {
          f.state = "Inscripto";
        }
      } else {
        f.state = "Sin Inscribir";
      }
      return f;
    }); 

    setFinalData(finalFinal);
  };

  useEffect(() => {
    getInitialInfo();
  }, []);

  useEffect(() => {
    setTests(globalState.test);
  }, [globalState]);

  useEffect(() => {
    if (studentxtest && tests && student) {
      getFinalInfo();
    }
  }, [studentxtest, tests, student]);

  useEffect(() => {
    if (studentxsubjectsxstudyplan) {
      buildData();
    }
  }, [studentxsubjectsxstudyplan]);

  const tableEvents = async (e, d) => { 
    if (e === 'check') {
      if (d.state !== "Sin Inscribir") {
        buildNotification({ code: 199, message: "Ya esta inscripto" }); 
        return;
      } 
      const dataSend = {
        note: d.note.trim(),
        testid: d.ID,
        studentsubjectstudyplanid: studentxsubjectsxstudyplan.filter(s => s.subject === d.subject)[0].ID
      };
      const result = await addStudentTest(globalDispatch, dataSend);
      buildNotification(result); 
      setFinalData(null);
      getInitialInfo();
    }
  }

  return (
    <React.Fragment>
      <Container className={styles.container}>
        { error }
        <Row>
          <h1>Finales</h1>
        </Row>
        <hr />
        <br />
        <br />  
        { finalData ?
        <Row>
          <Col xs lg="2"></Col>
          <Col>
            <Table
              key={'enrolltest'}
              tableEvents={(e, d) => tableEvents(e, d)}
              data={finalData}
              actions={'c'}
            /> 
          </Col>
          <Col xs lg="2"></Col>
        </Row> :
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" /> 
        </Row> }
      </Container>
    </React.Fragment>
  ); 
};

export default EnrollFinalTest;

