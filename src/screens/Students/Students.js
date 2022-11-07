import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ModalStudent from './Modal/ModalStudent';
import Table from '../../components/Table/Table';
import Notification from '../../components/Notification/Notification';

import { useGlobal } from '../../context/Global/GlobalProvider';
import { getStudents, changeStateStudent, addStudent, updateStudent } from '../../context/Global/actions/StudentActions';
import { addUser } from '../../context/Global/actions/UserActions';

import styles from './Students.module.css';

const Students = () => {

  const [globalState, globalDispatch] = useGlobal();
  const [show, setShow] = useState(false);
  const [dataRow, setDataRow] = useState('');
  const [dataStudents, setDataStudents] = useState([]);
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

  const getAllInfo = async () => {
    const students = await getStudents(globalDispatch);
    setDataStudents(students);
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
    setDataStudents(getAllInfo(globalDispatch));
  }, []);

  useEffect(() => {
    setDataStudents(globalState.students);
  }, [globalState]);

  const saveEventHandler = async (e) => {
    let result = {};
    if (e.ID) {
      result = await updateStudent(globalDispatch, e);
    } else {
      const newUser = {
        email: e.user,
        password: e.identityNumber,
        userType: 'alumno'
      };
      result = await addUser(globalDispatch, newUser);
      if (result.code === 201) {
        e.user = result.data;
        result = await addStudent(globalDispatch, e);
      }
    }
   
    buildNotification(result); 
    setDataStudents(getAllInfo(globalDispatch));
    setShow(current => !current);
    setDataRow('');
  };

  const addStudentEvent = () => {
    setShow(current => !current);
  };

  const closeStudentEvent = () => {
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
      const result = await changeStateStudent(globalDispatch, d);
      buildNotification(result); 
    }
  }

  return (
    <React.Fragment>
      <Container className={styles.container}>
        { error }
        <Row>
          <h1>Alumnos</h1>
        </Row>
        <hr />
        <br />
        <Row className="justify-content-center">
          <Col xs lg="4">
              <Button 
                className="w-100"
                variant="primary"
                size="xs"
                onClick={() => addStudentEvent()}
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
              key={'student'}
              tableEvents={(e, d) => tableEvents(e, d)}
              data={dataStudents}
              actions={'ec'}
              hidden={['phone', 'address', 'cuil', 'userId', 'degreeId', 'createdAt', 'updatedAt']}
            /> 
          </Col>
          <Col xs lg="1"></Col>
        </Row>
      </Container>
      <ModalStudent 
        show={show}
        handleClose={closeStudentEvent}
        saveEvent={(e) => saveEventHandler(e)}
        data={dataRow || ''}
      />
    </React.Fragment>
  );
};

export default Students;
