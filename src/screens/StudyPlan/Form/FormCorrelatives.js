import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, Button, Row, Spinner, Accordion, Card, ListGroup, Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import lodash from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import Notification from '../../../components/Notification/Notification';

import { useGlobal } from '../../../context/Global/GlobalProvider';
import { getSubject } from '../../../context/Global/actions/SubjectActions';

import { YearTertiary } from '../../../constant/constant';

import styles from '../StudyPlan.module.css';

const FormCorrelatives = ({ dataEntry, saveCorrelatives }) => {

  const [, globalDispatch] = useGlobal();
  // state of data from database
  const [dataSubjects, setDataSubjects] = useState([]);
  const [dataCorrelatives, setDataCorrelatives] = useState([]);
  // state of the component select
  const [selectSubject, setSelectSubject] = useState(null);
  const [selectYear, setSelectYear] = useState(null);
  const [selectCorrelatives, setSelectCorrelatives] = useState(null);
  // state of the value of selected
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCorrelatives, setSelectedCorrelatives] = useState(null);
  // state of the component listgroups
  const [firstYearSubject, setFirstYearSubject] = useState(null);
  const [secondYearSubject, setSecondYearSubject] = useState(null);
  const [thirdYearSubject, setThirdYearSubject] = useState(null);
  // state of the value of listgroups
  const [firstYearSubjectData, setFirstYearSubjectData] = useState([]);
  const [secondYearSubjectData, setSecondYearSubjectData] = useState([]);
  const [thirdYearSubjectData, setThirdYearSubjectData] = useState([]);
  // state to set the error or warnings
  const [error, setError] = useState(null);
  // set initial render
  const [initial, setInitial] = useState(true);

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

  const getAllSubjects = async () => {
    const dataSubjects = await getSubject(globalDispatch);
    setDataSubjects(dataSubjects);
    setDataCorrelatives(dataSubjects);
    return; 
  };

  const fillInitialValues = () => {
    dataEntry.dataSubjectsXStudyPlans.forEach(d => {
      let subject = {
        label: d.subject,
        value: dataSubjects.filter(s => s.name === d.subject).shift().ID
      };
      let yearValue;
      const correlatives = [];
      dataEntry.dataCorrelatives.forEach(c => {
        if (c.subjectXStudyPlanId === d.ID) yearValue = c.year; 
        if (c.correlative && c.subjectXStudyPlanId === d.ID) {
          c.correlative.forEach(cor => {
            correlatives.push({
              label: dataSubjects.filter(s => s.ID === cor).shift().name,
              value: cor
            });
          });
        }
      });
      const year = {
        label: yearValue,
        value: yearValue
      };
      fillArraySubjects(subject, year, correlatives);
      blankSelected(subject);
    });
  };

  useEffect(() => {
    getAllSubjects(globalDispatch);
  }, []);

  const onChangeSelectSubjects = (e) => {
    setSelectedSubject(e); 
  };

  const onChangeSelectYears = (e) => {
    setSelectedYear(e); 
  };

  const onChangeSelectCorrelatives = (e) => {
    setSelectedCorrelatives(e); 
  };

  const popover = (value) => {
    return <Popover id="popover-basic" style={{top:"25%", left:"65%"}}>
      <Popover.Header as="h3">Correlativas</Popover.Header>
      <Popover.Body>
        { value ? <ul>
        { value.map(v => {
          return <li key={v.value}>{v.label}</li> 
        })}
        </ul> : <p>No hay correlativas</p> }
      </Popover.Body>
    </Popover>
  };
  

  const fillArraySubjects = (subject, year, correlatives) => {
    switch (year.value) {
      case "1": 
        setFirstYearSubjectData(firstYearSubjectData => [
          ...firstYearSubjectData,
          { subject, year, correlatives }
        ]);
        break;
      case "2":
        setSecondYearSubjectData(secondYearSubjectData => [
          ...secondYearSubjectData,
          { subject, year, correlatives }
        ]);
        break;
      case "3":
        setThirdYearSubjectData(thirdYearSubjectData => [
          ...thirdYearSubjectData,
          { subject, year, correlatives }
        ]);
        break;
      default:
        break;
    }
  };

  const blankSelected = (value) => {
    const data = dataSubjects.filter(d => d.ID !== value.value); 
    setDataSubjects(data);
    setSelectSubject(null);
    setSelectYear(null);
    setSelectCorrelatives(null);
    setSelectedSubject(null);
    setSelectedYear(null);
    setSelectedCorrelatives(null);
  };

  const addCorrelatives = () => {
    if (!selectedSubject || !selectedYear) {
      showError('Debe ingresar todos los campos', 'warning');
      return;
    }
    fillArraySubjects(selectedSubject, selectedYear, selectedCorrelatives); 
    blankSelected(selectedSubject);
  };

  const deleteSubjectHandler = (value) => {
    setDataSubjects(dataSubjects => [...dataSubjects, {ID: value.subject.value, name: value.subject.label}]);
    setSelectSubject(null);
    setSelectYear(null);
    setSelectCorrelatives(null);
    const dataF = firstYearSubjectData.filter(f => f.subject.value !== value.subject.value); 
    setFirstYearSubjectData(dataF);
    const dataS = secondYearSubjectData.filter(f => f.subject.value !== value.subject.value); 
    setSecondYearSubjectData(dataS);
    const dataT = thirdYearSubjectData.filter(f => f.subject.value !== value.subject.value); 
    setThirdYearSubjectData(dataT);
  };

  const sendData = (e) => {
    e.preventDefault();
    const finalData = {
      studyPlanId: dataEntry.dataRow.id || '',
      correlatives: {
        firstYearSubjectData,
        secondYearSubjectData,
        thirdYearSubjectData
      }
    };
    saveCorrelatives(finalData); 
  };

  useEffect(() => {
    if (!lodash.isEmpty(dataSubjects) && dataEntry.dataRow && dataEntry.dataSubjectsXStudyPlans && dataEntry.dataCorrelatives && initial) {
      fillInitialValues();
      setInitial(false);
    }
  }, [dataSubjects]);

  useEffect(() => {
    if (!lodash.isEmpty(dataSubjects)) {
      setSelectSubject(
        <Select
          placeholder="-- Seleccionar --"
          name="subject"
          options={dataSubjects ? dataSubjects.map(s => ({ label: s.name, value: s.ID })) : null }
          onChange={onChangeSelectSubjects}
      />);

      setSelectYear(
        <Select
          placeholder="-- Seleccionar --"
          name="years"
          options={YearTertiary ? YearTertiary.map(y => ({ label: y, value: y })) : null }
          onChange={onChangeSelectYears}
      />);

      setSelectCorrelatives(
        <Select
          placeholder="-- Seleccionar --"
          name="correlatives"
          options={dataCorrelatives ? dataCorrelatives.map(s => ({ label: s.name, value: s.ID })) : null }
          onChange={onChangeSelectCorrelatives}
          isMulti
      />);
    }
  }, [dataSubjects, firstYearSubjectData, secondYearSubjectData, thirdYearSubjectData]);

  useEffect(() => {
    if (!lodash.isEmpty(firstYearSubjectData)) {
      setFirstYearSubject(<ListGroup>
        {firstYearSubjectData.map(f => {
          return <ListGroup.Item key={f.subject.value}>
            { f.subject.label }
            <Button className={styles.btn_subject_correlatives}>
              <FontAwesomeIcon 
                variant="danger" 
                onClick={() => deleteSubjectHandler(f)} 
                icon={faTrash} 
              />
            </Button>
            <span style={{float:"right"}}>&nbsp;&nbsp;</span>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover(f.correlatives)}>
              <Button className={styles.btn_subject_correlatives}><FontAwesomeIcon icon={faNetworkWired} />
                <Badge bg="success">{ f.correlatives ? f.correlatives.length : "0" }</Badge>
              </Button>
            </OverlayTrigger>
          </ListGroup.Item>
        })} 
        </ListGroup>);
    } else {
      setFirstYearSubject(null);
    }
  }, [firstYearSubjectData]);

  useEffect(() => {
    if (!lodash.isEmpty(secondYearSubjectData)) {
      setSecondYearSubject(<ListGroup>
        {secondYearSubjectData.map(f => {
          return <ListGroup.Item key={f.subject.value}>
            { f.subject.label }
            <Button className={styles.btn_subject_correlatives}>
            <FontAwesomeIcon 
              variant="danger" 
              onClick={() => deleteSubjectHandler(f)} 
              icon={faTrash} 
            />
            </Button>
            <span style={{float:"right"}}>&nbsp;&nbsp;</span>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover(f.correlatives)}>
              <Button className={styles.btn_subject_correlatives}><FontAwesomeIcon icon={faNetworkWired} />
                <Badge bg="success">{ f.correlatives ? f.correlatives.length : "0" }</Badge>
              </Button>
            </OverlayTrigger>
          </ListGroup.Item>
        })} 
        </ListGroup>);
    } else {
      setSecondYearSubject(null);
    }
  }, [secondYearSubjectData]);

  useEffect(() => {
    if (!lodash.isEmpty(thirdYearSubjectData)) {
      setThirdYearSubject(<ListGroup>
        {thirdYearSubjectData.map(f => {
          return <ListGroup.Item key={f.subject.value}>
            { f.subject.label }
            <Button className={styles.btn_subject_correlatives}>
              <FontAwesomeIcon 
                variant="danger" 
                onClick={() => deleteSubjectHandler(f)} 
                icon={faTrash} 
              />
            </Button>
            <span style={{float:"right"}}>&nbsp;&nbsp;</span>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover(f.correlatives)}>
              <Button className={styles.btn_subject_correlatives}><FontAwesomeIcon icon={faNetworkWired} />
                <Badge bg="success">{ f.correlatives ? f.correlatives.length : "0" }</Badge>
              </Button>
            </OverlayTrigger>
          </ListGroup.Item>
        })} 
        </ListGroup>);
    } else {
      setThirdYearSubject(null);
    }
  }, [thirdYearSubjectData]);

  return (
    <React.Fragment>
      <React.Fragment>
        { error }
        <h5>Materias</h5>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>1er Año</Accordion.Header>
            <Accordion.Body>
              { firstYearSubject }
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>2do Año</Accordion.Header>
            <Accordion.Body>
              { secondYearSubject } 
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>3er Año</Accordion.Header>
            <Accordion.Body>
              { thirdYearSubject }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> 
        <br/>
      </React.Fragment>
      <Card>
        <Card.Header>Agregar Correlatividad</Card.Header>
        <Card.Body>
        {
          lodash.isEmpty(dataSubjects) ?
          <Row className="justify-content-center">
            <Spinner animation="border" variant="primary" /> 
          </Row> :
          <React.Fragment> 
            <Form.Group className="mb-3" controlId="formBasicSubject">
              <Form.Label>Materia</Form.Label>
              { selectSubject } 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicYear">
              <Form.Label>Año</Form.Label>
              { selectYear }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDegree">
              <Form.Label>Correlativas</Form.Label>
              { selectCorrelatives } 
            </Form.Group>

            <br />
            <Button 
              variant="primary" 
              className="w-100"
              onClick={() => addCorrelatives()}
            >
              Agregar Materia    
            </Button>
          </React.Fragment>
        }
        </Card.Body>
      </Card>
      <br/>
      <Form onSubmit={sendData}>
        <Button
          className="w-100"
          variant="primary"
          type="submit"
        >
          Guardar Correlatividades
        </Button>
      </Form>
    </React.Fragment>
  )
}

export default FormCorrelatives;
