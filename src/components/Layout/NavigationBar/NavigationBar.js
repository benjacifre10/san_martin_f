import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import lodash from 'lodash';
import decodeToken from '../../../utils/jwt';
import { useGlobal } from "./../../../context/Global/GlobalProvider";

import styles from './NavigationBar.module.css';

import ToggleButton from '../SideBar/ToggleButton';

const NavigationBar = ({ toggleClick }) => {

  const [user, setUser] = useState('');
  const [icon, setIcon] = useState(null);
 
  const [globalState] = useGlobal();

  useEffect(() => {
    setUser(decodeToken(document.cookie));
    setIcon(<FontAwesomeIcon icon={faAngleDown} />);
  }, [globalState]);

  return (
    <header className={styles.toolbar}>
        <nav className={styles.toolbar__navigation}>
            <div className={styles.toolbar__toggle_button}>
                <ToggleButton click={toggleClick}/>
            </div>
            <div className={styles.toolbar__logo}>
                {
                  lodash.isEmpty(user) ?
                  <NavLink
                    to="/"
                  >
                    <img 
                      className={styles.toolbar__logo_img}
                      src="/logo.png"
                      alt="fintech"
                    />
                  </NavLink> :
                  <NavLink
                    to="/main"
                  >
                    <img 
                    className={styles.toolbar__logo_img}
                    src="/logo.png"
                    alt="fintech"
                    />
                  </NavLink>
                }
            </div>
            <div className={styles.spacer} />
            <div className={styles.toolbar__navigation_items}>
              {(() => {
                switch(user.type) {
                  case "ALUMNO": return (
                    <ul>
                      <li>
                        <div 
                          className={styles.toolbar__dropdown_container}
                          onMouseEnter={() => setIcon(<FontAwesomeIcon icon={faAngleRight} />)}
                          onMouseLeave={() => setIcon(<FontAwesomeIcon icon={faAngleDown} />)}
                        >
                          <span>Inscribir {icon}</span>
                          <ul>
                            <li>
                              <NavLink
                                className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                                to="/enroll/subject">
                                Materia
                              </NavLink>
                            </li>
                            <hr />
                            <li>
                              <NavLink
                                className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                                to="/enroll/test">
                                Examen Parcial
                              </NavLink>
                            </li>
                            <hr />
                            <li>
                              <NavLink
                                className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                                to="/enroll/final">
                                Examen Final
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/passwordchange">
                          Cambiar Password
                        </NavLink>
                      </li>
                      <li>
                        <NavLink 
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/logout">
                          Logout
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/help">
                          ?
                        </NavLink>
                      </li>
                    </ul> 
                  );
                  case "ADMINISTRATIVO": return (
                    <ul>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/students">
                          Alumnos
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/degree">
                          Carreras
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
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
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/passwordchange">
                          Cambiar Password
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/logout">
                          Logout
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/help">
                          ?
                        </NavLink>
                      </li>
                    </ul>
                  );
                  case "ADMINISTRADOR": return(
                    <ul>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/users">
                          Administrativos
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/passwordblank">
                          Blanqueo Password
                        </NavLink>
                      </li>
                      <li>
                        <div 
                          className={styles.toolbar__dropdown_container}
                          onMouseEnter={() => setIcon(<FontAwesomeIcon icon={faAngleRight} />)}
                          onMouseLeave={() => setIcon(<FontAwesomeIcon icon={faAngleDown} />)}
                        >
                          <span>Administrar {icon}</span>
                          <ul>
                            <li>
                              <NavLink
                                className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                                to="/roles">
                                Roles
                              </NavLink>
                            </li>
                            <hr />
                            <li>
                              <NavLink
                                className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                                to="/shift">
                                Turnos
                              </NavLink>
                            </li>
                            <hr />
                            <li>
                              <NavLink
                                className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                                to="/testtype">
                                Tipo Examen
                              </NavLink>
                            </li>
                            <hr />
                            <li>
                              <NavLink
                                className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                                to="/pursuetype">
                                Modalidad
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/logout">
                          Logout
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/help">
                          ?
                        </NavLink>
                      </li>
                    </ul>
                  );
                  default: return (
                    <ul>
                      <li>
                        <NavLink 
                          className={({isActive}) => (isActive ? styles.toolbar__link_active : styles.toolbar__link)}
                          to="/login">
                          Login
                        </NavLink>
                      </li>
                    </ul> 
                  );
                }
              })()}
            </div>
        </nav>
    </header>
  );
};

export default NavigationBar;
