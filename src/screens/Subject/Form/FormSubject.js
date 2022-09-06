import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, Button, Spinner, Row } from 'react-bootstrap';
import Notification from '../../../components/Notification/Notification';
import lodash from 'lodash';

import { useGlobal } from '../../../context/Global/GlobalProvider';
import { getProfessor } from '../../../context/Global/actions/ProfessorActions';
import { getShift } from '../../../context/Global/actions/ShiftActions';
import { getPursueType } from '../../../context/Global/actions/PursueTypeActions';
import { DaysOfWeek, CreditHours } from '../../../constant/constant';

const FormSubject = ({ dataEntry, saveData }) => {

  const [, globalDispatch] = useGlobal();
  const [dataProfessors, setDataProfessors] = useState([]);
  const [dataShifts, setDataShifts] = useState([]);
  const [dataPursueTypes, setDataPursueTypes] = useState([]);
  const [data, setData] = useState({
    ID: '',
    name: '',
    professor: '',
    shift: '',
    pursueType: '',
    creditHours: 0,
    days: [],
    from: '',
    to: '',
  });

  const [selectProfessor, setSelectProfessor] = useState(null);
  const [selectShift, setSelectShift] = useState(null);
  const [selectPursueType, setSelectPursueType] = useState(null);

  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedPursueType, setSelectedPursueType] = useState(null);
  const [selectedDays, setSelectedDays] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);

  const [error, setError] = useState(null);

  const getAllDataSelects = async () => {
    const dataProfessors = await getProfessor(globalDispatch);
    const dataShifts = await getShift(globalDispatch);
    const dataPursueTypes = await getPursueType(globalDispatch);
    setDataProfessors(dataProfessors);
    setDataShifts(dataShifts);
    setDataPursueTypes(dataPursueTypes);
    return; 
  };

  useEffect(() => {
    setData({
      ID: dataEntry.ID || '',
      name: dataEntry.name || '',        
      professor: dataEntry.professor || '',
      shift: dataEntry.shift || '',
      pursueType: dataEntry.pursueType || '',
      creditHours: dataEntry.creditHours || 0,
      days: dataEntry.days || [],
      from: dataEntry.from || '',
      to: dataEntry.to || '',
    }); 
    getAllDataSelects(globalDispatch);
  }, []);

  useEffect(() => {
    if (!lodash.isEmpty(dataProfessors) && !lodash.isEmpty(dataShifts) && !lodash.isEmpty(dataPursueTypes)) {
      setSelectProfessor(<Select
        placeholder="-- Seleccionar --"
        name="professor"
        defaultValue={dataEntry.professor && dataProfessors ? dataProfessors.filter(p => p.name === dataEntry.professor.split(' ')[0] && p.surname === dataEntry.professor.split(' ')[1]).map(d => ({ label: `${d.name} ${d.surname}`, value: d.ID }) ) : "-- Seleccionar --"}
        options={dataProfessors ? dataProfessors.map(d => ({ label: `${d.name} ${d.surname}`, value: d.ID })) : null }
        onChange={onChangeSelectProfessor}
      />);
      setSelectShift(<Select
        placeholder="-- Seleccionar --"
        name="shift"
        defaultValue={dataEntry.shift && dataShifts ? dataShifts.filter(s => s.type === dataEntry.shift).map(s => ({ label: s.type, value: s.ID })): "-- Seleccionar --"}
        options={dataShifts ? dataShifts.map(d => ({ label: d.type, value: d.ID })) : null }
        onChange={onChangeSelectShift}
      />);
      setSelectPursueType(<Select
        placeholder="-- Seleccionar --"
        name="pursuetype"
        defaultValue={dataEntry.pursuetype && dataPursueTypes ? dataPursueTypes.filter(p => p.type === dataEntry.pursuetype).map(p => ({ label: p.type, value: p.ID })): "-- Seleccionar --"}
        options={dataPursueTypes ? dataPursueTypes.map(d => ({ label: d.type, value: d.ID })) : null }
        onChange={onChangeSelectPursueType}
      />);
    }
  }, [dataProfessors, dataShifts, dataPursueTypes]);

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

  const handleInputChange = (event) => {
    setData({
      ...data,          
      [event.target.name] : event.target.value
    });
  };

  const onChangeSelectProfessor = (e) => {
    setSelectedProfessor(e);
  };

  const onChangeSelectShift = (e) => {
    setSelectedShift(e);
  };

  const onChangeSelectPursueType = (e) => {
    setSelectedPursueType(e); 
  };

  const onChangeSelectDays = (e) => {
    setSelectedDays(e); 
  };

  const onChangeSelectHours = (e) => {
    setSelectedHours(e); 
  };

  const validatedData = () => {
    if (!selectedProfessor && !data.professor) {
      showError('Debe seleccionar un profesor', 'danger');
      return false;
    }

    if (!selectedShift && !data.shift) {
      showError('Debe seleccionar un turno', 'danger');
      return false;
    }

    if (!selectedPursueType && !data.pursueType) {
      showError('Debe seleccionar una modalidad', 'danger');
      return false;
    }

    if (selectedPursueType ? selectedPursueType.label === 'PRESENCIAL' : dataEntry.pursuetype === 'PRESENCIAL') {
      switch (selectedShift ? selectedShift.label : dataEntry.shift) {
        case 'MATUTINO':
          if (parseInt(data.from.split(':')[0]) < 8 || parseInt(data.from.split(':')[0]) > 12) {
            showError('El horario matutino es de 8am a 13pm', 'warning');
            return false;
          }
          break;
        case 'VESPERTINO':
          if (parseInt(data.from.split(':')[0]) < 13 || parseInt(data.from.split(':')[0]) > 18) {
            showError('El horario vespertino es de 13am a 18pm', 'warning');
            return false;
          }
          break;
        case 'NOCTURNO':
          if (parseInt(data.from.split(':')[0]) < 18 || parseInt(data.from.split(':')[0]) > 23) {
            showError('El horario nocturno es de 18am a 23pm', 'warning');
            return false;
          }
          break;
        default:
          break;
      } 
    }

    const totalHours = (parseInt(data.to.split(':')[0]) - parseInt(data.from.split(':')[0])) * data.days.length;
    if (totalHours > data.creditHours) {
      showError('La cantidad de horas supera lo estipulado', 'warning');
      return false;
    }
    
    return true;
  };

  const sendData = (e) => {
    e.preventDefault();
    data.professor = selectedProfessor ? selectedProfessor.value : dataEntry.professor ? dataProfessors.filter(p => p.name === dataEntry.professor.split(' ')[0] && p.surname === dataEntry.professor.split(' ')[1]).map(d => d.ID ).shift() :  "";
    data.shift = selectedShift ? selectedShift.value : dataEntry.shift ? dataShifts.filter(s => s.type === dataEntry.shift).map(s => s.ID ).shift() : "";
    data.pursueType = selectedPursueType ? selectedPursueType.value : dataEntry.pursuetype ? dataPursueTypes.filter(p => p.type === dataEntry.pursuetype).map(p => p.ID).shift() : "";
    data.days = selectedDays ? selectedDays.map(d => d.label) : dataEntry.days ? dataEntry.days : [];
    data.creditHours = selectedHours ? selectedHours.label : dataEntry.creditHours ? dataEntry.creditHours.toString() : "";
    if (validatedData()) saveData(data); 
  };

  return (
      <React.Fragment> 
        { error }
        <Form onSubmit={sendData}>
          {
            lodash.isEmpty(dataProfessors) ?
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


              <Form.Group className="mb-3" controlId="formBasicProfessor">
                <Form.Label>Profesor</Form.Label>
                { selectProfessor }    
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicShift">
                <Form.Label>Turno</Form.Label>
                { selectShift }    
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPursueType">
                <Form.Label>Modalidad</Form.Label>
                { selectPursueType }    
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicHours">
                <Form.Label>Carga Horaria</Form.Label>
                <Select
                  placeholder="-- Seleccionar --"
                  name="hours"
                  defaultValue={ dataEntry.creditHours > 0 && CreditHours ? CreditHours.filter(f => parseInt(f) === dataEntry.creditHours).map((d, i) => ({ label: d, value: i })) : "- Seleccionar -" }
                  options={CreditHours ? CreditHours.map((d, i) => ({ label: d, value: i })) : null }
                  onChange={onChangeSelectHours}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDays">
                <Form.Label>Dias</Form.Label>
                <Select
                  placeholder="-- Seleccionar --"
                  name="days"
                  defaultValue={ dataEntry.days && dataEntry.days.length > 0 ? dataEntry.days.map(d => ({ label: d, value: d }) ) : "- Seleccionar -" }
                  options={DaysOfWeek ? DaysOfWeek.map(d => ({ label: d, value: d })) : null }
                  onChange={onChangeSelectDays}
                  isMulti
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFrom">
                <Form.Label>Desde</Form.Label>
                <Form.Control type="time" placeholder="Ingrese horario inicio" name="from" onChange={handleInputChange} value={data ? data.from : ''} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTo">
                <Form.Label>Hasta</Form.Label>
                <Form.Control type="time" placeholder="Ingrese horario fin" name="to" onChange={handleInputChange} value={data ? data.to : ''} />
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

export default FormSubject;

