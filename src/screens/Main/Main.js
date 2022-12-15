import React, { useState, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import decodeToken from '../../utils/jwt';
import { useGlobal } from "../../context/Global/GlobalProvider";
import { getStudent } from "../../context/Global/actions/StudentActions"

import styles from './Main.module.css';

const Main = () => {

  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [globalState, globalDispatch] = useGlobal();

  const getStudentInfo = async () => {
    const student = await getStudent(globalDispatch, user.email);
    if (student) setStudent(student.shift());
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

  return (
    <React.Fragment>
      {
        (user && user.type === 'ALUMNO' && student) ?
        <Container className={styles.container}>
          <Row>
            <h1>Alumno</h1>
          </Row> 
          <Row>
            <Card className={styles.rowCard}>
              <Card.Header>{student.user}</Card.Header>
              <Card.Body>
                <Card.Title>{student.name} {student.surname}</Card.Title>
                <Card.Text>
                  Dni: {student.identityNumber}
                </Card.Text>
                <Card.Text>
                  Direccion: {student.address}
                </Card.Text>
                <Card.Text>
                  Celular: {student.phone}
                </Card.Text>
                <Card.Text>
                  Cuil: {student.cuil}
                </Card.Text>
                <Card.Text>
                  Adeuda: {student.arrears ? 'Si' : 'No'}
                </Card.Text>
                <Card.Text>
                  Estado: {student.state ? 'Habilitado' : 'Inhabilitado'}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">{student.degree}</Card.Footer>
            </Card>
          </Row>
        </Container> :
        <Container className={styles.container}>
          <Row>
            <h1>Main</h1>
          </Row> 
        </Container>
      }
    </React.Fragment>
  );
};

export default Main;
