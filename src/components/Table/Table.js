import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import lodash from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import HeaderCol from './HeaderCol';
import BodyCol from './BodyCol';

import styles from './Table.module.css';


const Table = ({data, tableEvents, actions}) => {

  const [header, setHeader] = useState(null);
  const [body, setBody] = useState(null);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (data) {
      setDataTable(data);
    }
  }, [data]);

  useEffect(() => {
    if (!lodash.isEmpty(dataTable)) {
      loadHeader();
      loaderBody();
    }
  }, [dataTable]);

  const loadHeader = () => {
    const values = Object.keys(
      dataTable[0]).map((d, i) => {
        return <HeaderCol 
          key={i} 
          data={lodash.capitalize(d)} 
          colNumber={i} 
        />
      });
    setHeader([values, <HeaderCol 
          key={dataTable.length + 1} 
          data={'Acciones'}
          colNumber={actions ? Object.keys(dataTable[0]).length : 0}
        />]);  
  };

  const loaderBody = () => {
    const values = dataTable.map((d, i) => {
      return <Row key={i}>
        {Object.values(d).map((x, j) => {
          let dataColumn;
          switch (typeof x) {
            case "boolean":
              dataColumn = x ? 'Activo' : 'Inactivo';
              break;
            case "string":
              dataColumn = x;
              break;
            case "object":
              if (Array.isArray(x)) dataColumn = x.join(" ");
              else {
                dataColumn = <FontAwesomeIcon onClick={() => tableEvents('search', x)} icon={faPlusCircle}/>
              }
              break;
            default:
              dataColumn = x;
              break;
          }
          return <BodyCol 
            key={j} 
            data={dataColumn}
            colNumber={j} 
            actions={actions}
          />
        })}
        <BodyCol 
          key={Object.values(dataTable[0]).length + 1} 
          data={''} 
          colActions={(e) => eventsHandler(e, d)}
          actions={actions}
          colNumber={actions ? Object.values(dataTable[0]).length + 1 : 0} 
        />
      </Row>
    });

    setBody(values);
  };

  const eventsHandler = (e, d) => {
    tableEvents(e, d);
  };

  return (
    <div className={styles.Table}>
      <Row>
        {header}
      </Row>
      {body}
    </div>
  )
};

export default Table;
