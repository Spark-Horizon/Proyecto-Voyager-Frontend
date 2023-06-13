import React, { useEffect, useState } from 'react';
import { ReactComponent as ArrowLeft } from '../../../../assets/svg/icons/arrow-right-solid.svg';

import { useDashboardData } from '../../../../hooks/useDashboardData';
import { Loading } from '../../../Loading';
import { PDSHPanelTemplate } from '../../PDSHPanelTemplate';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;

export const StudentsTable = ({
  groupId,
  setStudentId,
  setStudentName,
  changeParentView,
  changeGrandparentView
}) => {
  const [isHovered, setisHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const { data, isLoading, axiosError, getData } = useDashboardData();

  useEffect(() => {
    getData(`http://${backendUrl}:${port}/dashboard/profesor/avances/estudiantes?groupId=${groupId}`);
  }, []);

  const handleOnMouseEnter = (index) => {
    setHoveredIndex(index);
    setisHovered(true);
  };

  const handleOnMouseLeave = () => {
    setisHovered(false);
  };

  const handleOnClick = (studentId, name, surname1, surname2) => {
    const fullName = name + ' ' + surname1 + ' ' + surname2;

    setStudentId(studentId);
    setStudentName(fullName);
    changeParentView(1);
  };

  return (
    <>
      <PDSHPanelTemplate
        title={`Estudiantes del grupo ${groupId}`}
        canReturn={true}
        changeParentView={changeGrandparentView}
        previousComponentIndex={0}
      />
      {
        isLoading && axiosError === null
        ? <div className='loading'><Loading /></div>
        : axiosError !== null
        ? <div>{axiosError}</div>
        : <div className="progress-main-container">
          <div className='progress-headers'>
            <div className="code-header"><p>Matrícula</p></div>
            <div className="name-header"><p>Nombre</p></div>
          </div>
          {data.map((row, index) => (
            <div
              key={row.id}
              className={`progress-item ${(isHovered && index === hoveredIndex) && 'p-i-selected'}`}
              onMouseEnter={() => handleOnMouseEnter(index)}
              onMouseLeave={() => handleOnMouseLeave(index)}
              onClick={() => handleOnClick(row.id, row.nombre, row.apellido1, row.apellido2)}
            >
              <div className="code-data"><b>{row.id}</b></div>
              <div className='name-data'>
                <p>{row.nombre + ' ' + row.apellido1 + ' ' + row.apellido2}</p>
                <ArrowLeft className={`arrow-left ${(isHovered && index === hoveredIndex) && 'a-l-selected'}`} />
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
};
