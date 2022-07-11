import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import FormLogin from '../../components/FormLogin/FormLogin';

import { useGlobal } from "./../../context/Global/GlobalProvider";
import { login } from '../../context/Global/actions/UserActions';

import styles from './Login.module.css';

const Login = () => {

  const navigate = useNavigate();

  const [globalState, globalDispatch] = useGlobal();


  const showError = (message) => {
    console.log('error', message);
  };

  const loginEvent = async (e) => {
    await login(globalDispatch, e);
    globalState.error ? showError(globalState.message) : navigate('/main');
  };

  return (
    <Container className={styles.container}>
      <Row>
        <h1>Login</h1>
      </Row>
      <Row className="justify-content-center">
        <Col xs lg="4">
          <FormLogin 
            login={(e) => loginEvent(e)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
