import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Table from '../../components/Table/Table';
import ModalEnrollSubject from './Modal/ModalEnrollSubject';
import Notification from '../../components/Notification/Notification';

import decodeToken from '../../utils/jwt';
import { useGlobal } from '../../context/Global/GlobalProvider';
import { getStudent } from "../../context/Global/actions/StudentActions";
import { getSubjectsXStudyPlan } from '../../context/Global/actions/SubjectXStudyPlanActions';
import { getStudyPlan } from "../../context/Global/actions/StudyPlanActions";
import { addStudentXSubjectsXStudyPlan, getStudentXSubjectsXStudyPlan } from '../../context/Global/actions/StudentXSubjectXStudyPlanActions';

import styles from './EnrollSubject.module.css';

const EnrollSubject = () => {

  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [sxsxsp, setSxsxsp] = useState(null);
  const [availableSubject, setAvailableSubject] = useState(null);

  const [globalState, globalDispatch] = useGlobal();
  const [show, setShow] = useState(false);
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

  const getStudentInfo = async () => {
    const student = await getStudent(globalDispatch, user.email);
    if (student) setStudent(student.shift());
    return;
  };

  const getStudentsStateSubjects = (students) => {
    return students.map(s => {
      if (!s.FinalNote) {
        s.approved = "Inscripto";
        return s;
      }      
      if (s.FinalNote < 4) {
        s.approved = "Desaprobado";
        return s;
      }
      if (s.FinalNote > 4) {
        s.approved = "Aprobado";
        return s;
      }
      return s;
    })
  };

  const getSxsxspInfo = async () => {
    const sxsxspInfo = await getStudentXSubjectsXStudyPlan(globalDispatch, student);
    if (sxsxspInfo) {
      const sxsxspState = getStudentsStateSubjects(sxsxspInfo);
      setSxsxsp(sxsxspState);
      setAvailableSubject(null);
    }
    return;
  };

  useEffect(() => {
    if (!user) {
      setUser(decodeToken(document.cookie));
    }
  }, [globalState]);

  useEffect(() => {
    if (user) {
      getStudentInfo(globalDispatch);
    }
  }, [user]);

  useEffect(() => {
    if (student) {
      getSxsxspInfo(globalDispatch);
    } 
  }, [student]);

  const addEnrollSubjectEvent = () => {
    setShow(current => !current);
  };

  const getExtraInfo = async () => {
    const studyplans = await getStudyPlan(globalDispatch);
    const { ID: id } = studyplans.filter(sp => sp.degree === student.degree).shift();
    const subjects = await getSubjectsXStudyPlan(globalDispatch, {id});
    if (sxsxsp) {
      const subjectsrest = subjects.filter((elem) => !sxsxsp.find(({ subject }) => elem.subject === subject));
      setAvailableSubject(subjectsrest);
      return;
    }
    setAvailableSubject(subjects);
  };

  const closeEnrollSubjectEvent = () => {
    setShow(current => !current);
  };

  const saveEventHandler = async (e) => {
    const result = await addStudentXSubjectsXStudyPlan(globalDispatch, e) ;
    buildNotification(result); 
    setSxsxsp(null);
    getSxsxspInfo(globalDispatch);
    setShow(current => !current);
  };

  if (student && !availableSubject) {
    getExtraInfo();
  }

  return (
    <React.Fragment>
      <Container className={styles.container}>
        { error }
        <Row>
          <h1>Inscribir Materias</h1>
        </Row>
        <hr />
        <br />
        {
          (availableSubject || (!availableSubject && !sxsxsp)) ?
          <React.Fragment>
            <Row className="justify-content-center">
              <Col xs lg="4">
                <Button 
                  className="w-100"
                  variant="primary"
                  size="xs"
                  onClick={() => addEnrollSubjectEvent()}
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
                  key={'enrollsubject'}
                  data={sxsxsp}
                  actions={''}
                /> 
              </Col>
              <Col xs lg="2"></Col>
            </Row>
          </React.Fragment> :
          <Row className="justify-content-center">
            <Spinner animation="border" variant="primary" /> 
          </Row>
        }
      </Container>
      <ModalEnrollSubject 
        show={show}
        handleClose={closeEnrollSubjectEvent}
        saveEvent={(e) => saveEventHandler(e)}
        data={{availableSubject, student}}
      />
    </React.Fragment>
  ); 
};

export default EnrollSubject;
