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
          <p>El rol de administrativo y su consiguiente módulo, es quien tiene a cargo el mantenimiento de la operatoria administrativa y burocrática diaria del sistema. A tal fin tiene accesos y privilegios que ningún otro rol posee. Se describen los mismos debajo.
            Para ingresar a dicho módulo deberá hacer login con usuario y contraseña válidos.
            Para salir de este módulo debe hacer click en el botón “logout”.

            El administrativo tiene la potestad de llevar a cabo las siguientes tareas debajo:</p>
          <ul>
            <li><strong>Alta/Baja/Modificación de Alumnos</strong>(para esto debe hacer click en el botón “Alumnos” en el margen superior derecho), allí podrá dar de alta un alumno nuevo con el botón azul “agregar”. También puede listar los alumnos existentes y editar información de los mismos con el pequeño “lápiz” a la derecha de cada entrada.  También está la posibilidad de desactivar o activar el mismo usuario con el botón de “tilde” también a la derecha de cada entrada.</li>
            <li><strong>Alta/Baja/Modificación de Carreras</strong>(para esto debe hacer click en el botón “Carreras” en el margen superior derecho), allí podrá dar de alta una Carreras nueva con el botón azul “agregar”. También puede listar las Carreras existentes y editar información de las mismas con el pequeño “lápiz” a la derecha de cada entrada.  También está la posibilidad de desactivar o activar una carrera con el botón de “tilde” también a la derecha de cada entrada.</li>
            <li><strong>Alta/Baja/Modificación de Profesores</strong>(para esto debe hacer click en el botón “Profesores” en el margen superior derecho), allí podrá dar de alta un Profesor nuevo con el botón azul “agregar”. También puede listar los Profesores existentes y editar información de los mismos con el pequeño “lápiz” a la derecha de cada entrada.  También está la posibilidad de desactivar o activar el Profesor en cuestión con el botón de “tilde” también a la derecha de cada entrada.</li>
            <li><strong>Alta/Baja/Modificación de Planes de Estudio</strong>(para esto debe hacer click en el botón “Plan de Estudio” en el margen superior derecho), allí podrá dar de alta un Plan de Estudio nuevo con el botón azul “agregar”. También puede listar los Planes existentes y editar información de los mismos con el pequeño “lápiz” a la derecha de cada entrada.  También está la posibilidad de desactivar o activar el Plan de Estudio en cuestión con el botón de “tilde” también a la derecha de cada entrada. Cuenta también con el botón “+” para agregar y editar materias o correlatividades de dicho Plan de Estudio. La agregación de materias al plan de estudio se debe hacer luego de la alta de las mismas en otro botón de este mismo perfil. Se agregan materias y correlatividades por año del Plan de Estudio.</li>
            <li><strong>Alta/Baja/Modificación de Materias </strong>(para esto debe hacer click en el botón “Materias” en el margen superior derecho), allí podrá dar de alta una Materia nueva con el botón azul “agregar”. También puede listar las Materias existentes y editar información de las mismas con el pequeño “lápiz” a la derecha de cada entrada.  También está la posibilidad de desactivar o activar la Materias en cuestión con el botón de “tilde” también a la derecha de cada entrada. Para dar de alta una materia se debe especificar días de cursada y cantidad de horas cátedra por materia. El sistema está preparado para corregir inconsistencias en dicho requerimiento de días de cursada y horas cátedra con hora de inicio y hora de fin de clase. También se debe especificar el nombre de la materia, así como la modalidad de cursada. La actualización de datos se da por medio del botón azul “actualizar”</li>
            <li><strong>Cambiar contraseña de Profesores o Alumnos con su correo electrónico.</strong>Aquí el administrativo podrá cambiar la contraseña de alumnos , profesores u otro administrador por medio del correo electrónico del mismo, para ello, debe hacer click izquierdo sobre el botón “Cambiar Password” en el margen superior derecho.</li>
            <li><strong>Alta/Baja/Modificación de Exámenes</strong>(para esto debe hacer click en el botón “Exámenes” en el margen superior derecho, el cual ejecuta un menú desplegable en el que hay dos opciones, “Inscribir” y “corregir”). Al presionar “inscribir” se le abrirá una pantalla para dar de alta un examen. Dentro de esta pantalla podrá elegir el día, hora , el número de formulario y hoja donde se guardará el registro, la carrera , materia, tipo de examen y profesor que tomará el mismo. Debe presionar en el botón azul “guardar” para grabar los datos ingresados. Si usted oprime el botón “corregir” examen, se le desplegará un menú para guardar los resultados de los exámenes ya tomados por los profesores.  Debe presionar en el botón azul “guardar” para grabar los datos ingresados. También puede hacer correcciones a datos ya ingresados editando de nuevo con el botón lápiz la nota ya ingresada. Si el perfil administrativo no da de alta los exámenes para las materias, los alumnos no contaran con los mismos para inscripcion en sus perfiles. </li>
          </ul>
          <br/>
          <h4><u><strong>Alumno</strong></u></h4>
          <p>El rol de Alumno y su consiguiente módulo, es el módulo que le permite al alumno poder llevar a cabo tareas administrativas correspondiente a su rol de alumno. 
            Para ingresar a dicho módulo deberá hacer login con usuario y contraseña válidos.
            Para salir de este módulo debe hacer click en el botón “logout”. El alumno puede inscribirse a materias, inscribirse a examen parcial o final, así como consultar porcentaje de materias aprobadas.</p>
          <ul>
            <li><strong>Cambiar su contraseña de perfil de alumno.</strong>Aquí el alumno podrá cambiar la contraseña de usuario, para ello, debe hacer click izquierdo sobre el botón “Cambiar Password” en el margen superior derecho</li>
            <li><strong>Inscripción a materia, examen parcial o examen final.</strong>Aquí el alumno podrá hacer inscripción online a materias y exámenes. No podrá inscribirse a exámenes si no se ha inscripto a materias con anterioridad. El campo de nota de la materia tendrá como nota la que obtenga el alumno en el último examen final de la misma. Si la nota conseguida es mayor a 4, el estado de la inscripción a la materia pasará automáticamente de “inscripto” a “aprobado”. En caso de haber aprobado el examen final de una materia X, podrá inscribirse a su materia correlativa del año siguiente. Cuando el perfil administrativo habilite los exámenes parciales y finales, los mismos estarán disponible en el perfil alumno siempre que se haya el mismo inscripto en dicha materia con anterioridad. Para inscribirse a un examen disponible, el alumno solo debe presionar el botón “tilde”. </li>
          </ul>
        </Row>
      </Container>
    </React.Fragment>
  )  
};

export default Help;
