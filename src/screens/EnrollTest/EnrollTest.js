import React from 'react';
import { Container, Row } from 'react-bootstrap';

import styles from './EnrollTest.module.css';

const EnrollTest = () => {
  return (
    <React.Fragment>
      <Container className={styles.container}>
        <Row>
          <h1>EnrollTest</h1>
        </Row>
      </Container>
    </React.Fragment>
  ); 
};

export default EnrollTest;


