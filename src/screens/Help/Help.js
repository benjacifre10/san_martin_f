import React from 'react';
import { Container, Row } from 'react-bootstrap';

import styles from './Help.module.css';

const Help = () => {
  return (
    <React.Fragment>
      <Container className={styles.container}>
        <Row>
          <h1><strong>Manual del Usuario del Sistema Integrado de Gestión Educativa</strong></h1>
        </Row>
        <br />
        <Row>
          <h2>Introducción:</h2>
          <p>Este sistema está pensado para asistir en la operativa diaria de una institución terciaria o Universitaria. Este sistema no está pensado para hacer almacenamiento de contenido educativo.</p>
          <p>Este sistema se compone de una base de datos NoSQL MongoDB, un middleware escrito en GO y un frontend escrito en NodeJS. Los componentes pueden ser ejecutados en forma local o en la nube. Para tener este sistema en producción, se debe tener en cuenta un sistema alternativo de resguardo de datos, el cual no está provisto en este release.</p>
          <p>El sistema entonces, tiene una interfaz web con un subsistema de logueo por usuario con contraseña al tiempo que dicho usuario asignado un rol (docente, alumno, administrativo o administrador) y según el rol asignado tendrá diferentes privilegios de acceso.</p>
        </Row>
        <Row>
          <h2>Módulos</h2>
          <p>El sistema está dividido en módulos:</p>
          <h4><u><strong>Administrador</strong></u></h4>
          <p>El administrador es quien puede llevar a cabo las siguientes tareas debajo. Para ingresar a dicho módulo deberá hacer login con usuario y contraseña válidos.
Para salir de este módulo debe hacer click en boton “logout”</p>
          <ul>
            <li><strong>Agregar o eliminar Administrativos</strong>(para esto debe hacer click en el botón “administrativo” en el margen superior derecho).</li>
            <li><strong>Blanquear contraseña de administrativos o administradores por medio de su correo electrónico</strong>(para esto debe hacer click izquierdo en el botón “Blanqueo Password” en el margen superior derecho), para ello, debe hacer click izquierdo sobre el botón “Cambiar Password” en el margen superior derecho.</li>
            <li><strong>Alta/Baja/Modificación de Roles</strong>(para esto debe hacer click izquierdo en el botón “Administrar” y luego “Roles” en el margen superior derecho).</li>
            <li><strong>Alta/Baja/Modificación de Turnos</strong>(para esto debe hacer click izquierdo en el botón “Administrar” y luego “Turnos” en el margen superior derecho).</li>
            <li><strong>Alta/Baja/Modificación de Tipos de Examen</strong>(para esto debe hacer click izquierdo en el botón “Administrar” y luego “Tipos de examen” en el margen superior derecho).</li>
            <li><strong>Alta/Baja/Modificación de Modalidad de cursada</strong>(para esto debe hacer click izquierdo en el botón “Administrar” y luego “Modalidad de cursada” en el margen superior derecho).</li>
          </ul>
          <br/>
          <h4><u><strong>Administrativo</strong></u></h4>
          <br/>
          <h4><u><strong>Alumno</strong></u></h4>
        </Row>
      </Container>
    </React.Fragment>
  )  
};

export default Help;
