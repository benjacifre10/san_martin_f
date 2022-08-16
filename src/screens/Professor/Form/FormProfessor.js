import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormProfessor = ({ dataEntry, saveData }) => {

  const [data, setData] = useState({
    ID: '',
    name: '',
    surname: '',
    identityNumber: ''
  });

  useEffect(() => {
      setData({
        ID: dataEntry.ID || '',
        name: dataEntry.name || '',
        surname: dataEntry.surname || '',
        identityNumber: dataEntry.identityNumber || ''
      }); 
  }, []);

  const handleInputChange = (event) => {
    setData({
      ...data,          
      [event.target.name] : event.target.value
    });
  };

  const sendData = (e) => {
    e.preventDefault();
    saveData(data); 
  };

  return (
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" controlId="formBasicID">
        <Form.Control type="hidden" disabled name="ID" value={data ? data.ID : ''}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingrese nombre" name="name" onChange={handleInputChange} value={data ? data.name : ''} autoFocus />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" placeholder="Ingrese apellido" name="surname" onChange={handleInputChange} value={data ? data.surname : ''} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicIdentityNumber">
        <Form.Label>DNI</Form.Label>
        <Form.Control type="text" placeholder="Ingrese dni" name="identityNumber" onChange={handleInputChange} value={data ? data.identityNumber : ''} disabled={dataEntry.ID ? true : false} />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit" className="w-100">
        { dataEntry ? 'Actualizar' : 'Guardar' }
      </Button>
    </Form>
  )
}

export default FormProfessor;

