import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { useGlobal } from "./../../../context/Global/GlobalProvider";

import styles from './SideBar.module.css';

const SideBar = ({ show, click }) => {

  const [globalState] = useGlobal();
  const [icon, setIcon] = useState(null);
  const { userLogin } = globalState;

  useEffect(() => {
    setIcon(<FontAwesomeIcon icon={faAngleDown} />);
  }, [globalState]);

  return (
    <nav className={(show ? [styles.side_bar, styles.side_bar__open].join(" ") : styles.side_bar)}>
      <div className={styles.side_bar__close}>
        <span onClick={click}>X</span>
      </div>
      {(() => {
        switch(userLogin.type) {
          case "ALUMNO": return (
            <ul>
              <li>
                <div 
                  className={styles.sidebar__dropdown_container}
                  onMouseEnter={() => setIcon(<FontAwesomeIcon icon={faAngleRight} />)}
                  onMouseLeave={() => setIcon(<FontAwesomeIcon icon={faAngleDown} />)}
                >
                  <span>Inscribir {icon}</span>
                  <ul>
                    <li>
                      <NavLink
                        className={styles.side_bar__link_submenu}
                        to="/enroll/subject">
                        Materia
                      </NavLink>
                    </li>
                    <hr />
                    <li>
                      <NavLink
                        className={styles.side_bar__link_submenu}
                        to="/enroll/test">
                        Examen Parcial
                      </NavLink>
                    </li>
                    <hr />
                    <li>
                      <NavLink
                        className={styles.side_bar__link_submenu}
                        to="/enroll/final">
                        Examen Final
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NavLink
                  className={styles.side_bar__link}
                  to="/passwordchange">
                  Cambiar Password
                </NavLink>
              </li>
              <li>
                <NavLink 
                  className={styles.side_bar__link}
                  to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul> 
          );
          case "ADMINISTRATIVO": return (
            <ul>
              <li>
                <NavLink
                  className={styles.side_bar__link}
                  to="/students">
                  Alumnos
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.side_bar__link}
                  to="/degree">
                  Carreras
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.side_bar__link}
                  to="/professor">
                  Profesores
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                  to="/studyplan">
                  Plan de Estudio
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                  to="/subject">
                  Materias
                </NavLink>
              </li>
              <li>
                <div 
                  className={styles.toolbar__dropdown_container}
                  onMouseEnter={() => setIcon(<FontAwesomeIcon icon={faAngleRight} />)}
                  onMouseLeave={() => setIcon(<FontAwesomeIcon icon={faAngleDown} />)}
                >
                  <span>Examenes {icon}</span>
                  <ul>
                    <li>
                      <NavLink
                        className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                        to="/test">
                        Inscribir
                      </NavLink>
                    </li>
                    <hr />
                    <li>
                      <NavLink
                        className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                        to="/test/note">
                        Corregir
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NavLink
                  className={styles.side_bar__link}
                  to="/passwordchange">
                  Cambiar Password
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.side_bar__link}
                  to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          );
          case "ADMINISTRADOR": return(
            <ul>
              <li>
                <NavLink
                  className={styles.side_bar__link}
                  to="/users">
                  Administrativos
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={styles.side_bar__link}
                  to="/passwordblank">
                  Blanqueo Password
                </NavLink>
              </li>
              <li>
                <div 
                  className={styles.sidebar__dropdown_container}
                  onMouseEnter={() => setIcon(<FontAwesomeIcon icon={faAngleRight} />)}
                  onMouseLeave={() => setIcon(<FontAwesomeIcon icon={faAngleDown} />)}
                >
                  <span>Administrar {icon}</span>
                  <ul>
                    <li>
                      <NavLink
                        className={styles.side_bar__link_submenu}
                        to="/roles">
                        Roles
                      </NavLink>
                    </li>
                    <hr />
                    <li>
                      <NavLink
                        className={styles.side_bar__link_submenu}
                        to="/shift">
                        Turnos
                      </NavLink>
                    </li>
                    <hr />
                    <li>
                      <NavLink
                        className={styles.side_bar__link_submenu}
                        to="/testtype">
                        Tipo Examen
                      </NavLink>
                    </li>
                    <hr />
                    <li>
                      <NavLink
                        className={styles.side_bar__link_submenu}
                        to="/pursuetype">
                        Modalidad
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NavLink
                  className={styles.side_bar__link}
                  to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          );
          default: return (
            <ul>
              <li>
                <NavLink 
                  className={styles.side_bar__link}
                  to="/login">
                  Login
                </NavLink>
              </li>
            </ul> 
          );
        }
      })()}
    </nav>
  );
};


export default SideBar;
