import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, Button, Spinner, Row } from 'react-bootstrap';
import lodash from 'lodash';

import { useGlobal } from '../../../context/Global/GlobalProvider';
import { getDegree } from '../../../context/Global/actions/DegreeActions';

const FormStudyPlan = ({ dataEntry, saveData }) => {

  const [, globalDispatch] = useGlobal();
  const [dataDegrees, setDataDegrees] = useState([]);
  const [data, setData] = useState({
    ID: '',
    name: '',
    code: '',
    degree: '',
  });
  let degrees = [];
  const [degreeEdit, setDegreeEdit] = useState(null);
  const [select, setSelect] = useState(null);
  const [degreeSelect, setDegreeSelect] = useState(null);

  const [emptyData, setEmptyData] = useState(false);

  const getAllDegrees = async () => {
    const result = await getDegree(globalDispatch);
    setDataDegrees(result);
    return; 
  };

  useEffect(() => {
    setData({
      ID: dataEntry.ID || '',
      name: dataEntry.name || '',        
      code: dataEntry.code || '',
      degree: dataEntry.degree || '',
    }); 
    setDataDegrees(getAllDegrees(globalDispatch));
    setTimeout(() => {
      setEmptyData(true);
    }, 4000);
  }, []);

  useEffect(() => {
    if (dataEntry.ID && dataDegrees.length > 0) {
      const editLabel = dataEntry.degree;
      const editValue = dataDegrees[lodash.findIndex(degrees, (d) => { return d.label === editLabel })].ID;
      setDegreeEdit({
        label: editLabel,
        value: editValue 
      });
    }
    if (!dataEntry) {
      setSelect(<Select
        placeholder="-- Seleccionar --"
        name="degree"
        options={degrees ? degrees : null }
        onChange={onChangeSelect}
        isDisabled={dataEntry.ID ? true : false}
        />);
    }
  }, [dataDegrees]);

  useEffect(() => {
    if (degreeEdit) {
      setSelect(<Select
        placeholder="-- Seleccionar --"
        name="degree"
        defaultValue = { degreeEdit.label ? {label: degreeEdit.label, value: degreeEdit.value} : "-- Seleccionar --" }
        options={degrees ? degrees : null }
        onChange={onChangeSelect}
        isDisabled={dataEntry.ID ? true : false}
        />);
    }
  }, [degreeEdit]);

  const handleInputChange = (event) => {
    setData({
      ...data,          
      [event.target.name] : event.target.value
    });
  };

  const onChangeSelect = (e) => {
    setDegreeSelect(e);
  };

  const sendData = (e) => {
    e.preventDefault();
    data.degree = degreeEdit ? degreeEdit.value : degreeSelect.value;
    saveData(data); 
  };


  if (dataDegrees && dataDegrees.length > 0) {
    degrees = dataDegrees
      .filter(d => d.active === true)
      .map(d => {
        return {
          label: d.name,
          value: d.ID,
        };
    });
  }

  return (
    <React.Fragment>
      <Form onSubmit={sendData}>
        {
          lodash.isEmpty(dataDegrees) ?
          emptyData ? 
            <Row className="justify-content-center">
              No hay carreras disponibles!!              
            </Row> :
            <Row className="justify-content-center">
              <Spinner animation="border" variant="primary" /> 
            </Row> :
          <React.Fragment>
            <Form.Group className="mb-3" controlId="formBasicID">
              <Form.Control type="hidden" disabled name="ID" value={data ? data.ID : ''}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingrese nombre" name="name" onChange={handleInputChange} value={data ? data.name : ''} autoFocus />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCode">
              <Form.Label>Codigo</Form.Label>
              <Form.Control type="text" placeholder="Ingrese codigo" name="code" onChange={handleInputChange} value={data ? data.code : ''} disabled={dataEntry.ID ? true : false}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDegree">
              <Form.Label>Carrera</Form.Label>
              { select }    
            </Form.Group>

            <br />
            <Button variant="primary" type="submit" className="w-100">
              { dataEntry ? 'Actualizar' : 'Guardar' }
            </Button>
          </React.Fragment>
        }
      </Form>
    </React.Fragment>
  )
}

export default FormStudyPlan;
