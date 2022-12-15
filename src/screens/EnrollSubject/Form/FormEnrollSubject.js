import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

const FormEnrollSubject = ({ dataEntry, saveData }) => {

  const [data, setData] = useState({
    finalnote: '',
    approved: false,
    studentid: '',
    subjectstudyplanid: '',
  });
  const [select, setSelect] = useState(null);
  const [selectValue, setSelectValue] = useState(null);

  useEffect(() => {
      setData({
        finalnote: '',
        approved: false,
        studentid: dataEntry.student.ID,
        subjectstudyplanid: '',
      }); 
      setSelect(<Select
        placeholder="-- Seleccionar --"
        name="subject"
        options={dataEntry.availableSubject ? dataEntry.availableSubject.map(s => ({ label: s.subject, value: s.ID })) : null }
        onChange={onChangeSelect}
        />);
  }, []);

  const onChangeSelect = (e) => {
    setSelectValue(e);
  };

  const sendData = (e) => {
    e.preventDefault();
    if (selectValue) {
      data.subjectstudyplanid = selectValue.value; 
      saveData(data); 
    } else return;

  };

  return (
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" controlId="formBasicSubject">
        <Form.Label>Carrera</Form.Label>
        { select }    
      </Form.Group>
      <br />
      <Button variant="primary" type="submit" className="w-100">
        Guardar      
      </Button>
    </Form>
  )
}

export default FormEnrollSubject;

