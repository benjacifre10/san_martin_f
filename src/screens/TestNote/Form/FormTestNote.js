import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import lodash from 'lodash';

const FormTestNote = ({ dataEntry, saveData }) => {

  const [data, setData] = useState({
    ID: '',
    note: ''
  });

  useEffect(() => {
      dataEntry.note = dataEntry.note.trim();
      setData({
        ID: dataEntry.ID || '',
        note: dataEntry.note || ''
      }); 
  }, []);

  const handleInputChange = (event) => {
    setData({
      ...data,          
      [event.target.name] : lodash.toUpper(event.target.value)
    });
  };

  const sendData = (e) => {
    e.preventDefault();
    if (!(parseInt(data.note) > 0 && parseInt(data.note) < 11)) {
      alert("El rango debe ser entre 1 y 10");
      return;
    }
    saveData(data); 
  };

  return (
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" controlId="formBasicID">
        <Form.Control type="hidden" disabled name="ID" value={data ? data.ID : ''}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicType">
        <Form.Label>Nota</Form.Label>
        <Form.Control type="text" placeholder="Ingrese nota" name="note" onChange={handleInputChange} value={data ? data.note : ''} autoFocus />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit" className="w-100">
        Actualizar
      </Button>
    </Form>
  )
}

export default FormTestNote;
