import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, Button } from 'react-bootstrap';
import lodash from 'lodash';

import { useGlobal } from '../../../context/Global/GlobalProvider';
import { getSubjectsXStudyPlan } from '../../../context/Global/actions/SubjectXStudyPlanActions';

const TestForm = ({ dataEntry, saveData }) => {

  const [, globalDispatch] = useGlobal();
  // state of component select
  const [selectProfessors, setSelectProfessors] = useState(null);
  const [selectStudyPlans, setSelectStudyPlans] = useState(null);
  const [selectSubjects, setSelectSubjects] = useState(null);
  const [selectTestTypes, setSelectTestTypes] = useState(null);
  // state of the value of selected
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTestType, setSelectedTestType] = useState(null);
  // data subjects from studyplan
  const [dataSubjects, setDataSubjects] = useState(null);

  const [data, setData] = useState({
    testDate: '',
    sheet: '',
    form: '',
    subjectXStudyPlanId: '',
    professorId: '',
    testTypeId: ''
  });

  const onChangeSelectStudyPlans = async (e) => {
    const subjects = await getSubjectsXStudyPlan(globalDispatch, {id: e.value });
    setDataSubjects(subjects);
    setSelectSubjects(
      <Select
        placeholder="-- Seleccionar --"
        name="subjects"
        options={subjects ? subjects.map(s => ({ label: s.subject, value: s.ID })) : null }
        onChange={onChangeSelectSubjects}
        isDisabled={subjects ? false : true}
    />);
  };

  const onChangeSelectSubjects = (e) => {
    setSelectedSubject(e); 
  };

  const onChangeSelectProfessors = (e) => {
    setSelectedProfessor(e); 
  };

  const onChangeSelectTestTypes = (e) => {
    setSelectedTestType(e); 
  };

  useEffect(() => {
    setSelectStudyPlans(
      <Select
        placeholder="-- Seleccionar --"
        name="degree"
        options={dataEntry.studyplans ? dataEntry.studyplans.map(s => ({ label: s.degree, value: s.ID })) : null }
        onChange={onChangeSelectStudyPlans}
    />);
    setSelectSubjects(
      <Select
        placeholder="-- Seleccionar --"
        name="subjects"
        options={dataSubjects ? dataSubjects.map(s => ({ label: s.subject, value: s.ID })) : null }
        onChange={onChangeSelectSubjects}
        isDisabled={dataSubjects ? false : true}
    />);
    setSelectProfessors(
      <Select
        placeholder="-- Seleccionar --"
        name="professor"
        options={dataEntry.professors ? dataEntry.professors.map(p => ({ label: p.name + ' ' + p.surname, value: p.ID })) : null }
        onChange={onChangeSelectProfessors}
    />);
    setSelectTestTypes(
      <Select
        placeholder="-- Seleccionar --"
        name="testtype"
        options={dataEntry.testtypes ? dataEntry.testtypes.map(t => ({ label: lodash.capitalize(t.type), value: t.ID })) : null }
        onChange={onChangeSelectTestTypes}
    />);
  }, [dataEntry.studyplans]);

  const handleInputChange = (event) => {
    setData({
      ...data,          
      [event.target.name] : event.target.value
    });
  };

  const changeFormatDate = (value) => {
    const dateValue = value.split('T');
    const datePart = dateValue[0].split('-');
    const hourPart = dateValue[1];
    return `${datePart[2]}/${datePart[1]}/${datePart[0]} ${hourPart}`;
  };

  const sendData = (e) => {
    e.preventDefault();
    data.testDate = changeFormatDate(data.testDate);
    data.subjectXStudyPlanId = selectedSubject ? selectedSubject.value : '';
    data.professorId = selectedProfessor ? selectedProfessor.value : '';
    data.testTypeId = selectedTestType ? selectedTestType.value : '';
    saveData(data); 
  };

  return (
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Fecha de Examen</Form.Label>
        <Form.Control type="datetime-local" placeholder="Ingrese fecha" name="testDate" onChange={handleInputChange} autoFocus />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicForm">
        <Form.Label>Formulario</Form.Label>
        <Form.Control type="text" placeholder="Ingrese formulario" name="form" onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSheet">
        <Form.Label>Hoja</Form.Label>
        <Form.Control type="text" placeholder="Ingrese hoja" name="sheet" onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicStudyPlan">
        <Form.Label>Carrera</Form.Label>
        { selectStudyPlans }
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSubject">
        <Form.Label>Materia</Form.Label>
        { selectSubjects }
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicProfessor">
        <Form.Label>Profesor</Form.Label>
        { selectProfessors }
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicTestType">
        <Form.Label>Tipo de Examen</Form.Label>
        { selectTestTypes }
      </Form.Group>
      <br />
      <Button variant="primary" type="submit" className="w-100">
        Guardar
      </Button>
    </Form>
  )
}

export default TestForm;

