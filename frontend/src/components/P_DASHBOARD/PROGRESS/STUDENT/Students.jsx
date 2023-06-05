import React, { useEffect, useState } from 'react';
import { useDashboardData } from '../../../../hooks/useDashboardData';

import { ReactComponent as ArrowLeft } from '../../../../assets/svg/icons/arrow-right-solid.svg';

import '../../../../styles/professor_dashboard/students.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;

export const Students = ({ groupId, setCurrentView, setChangeViewFunction, setCanReturn, setComponentTitle }) => {
    const { data, axiosError, isLoading, getData } = useDashboardData();
    const [isHovered, setisHovered] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [studentViews, setStudentViews] = useState([]);


    const url = `http://${backendUrl}:${port}/dashboard/profesor/avances/estudiantes?groupId=${groupId}`;

    const handleReturnToPreviousView = () => {
        setChangeViewFunction(null);
        setCurrentView(0);
        setComponentTitle('Grupos');
        setCanReturn(false);
    };

    const handleOnMouseEnter = (index) => {
        setHoveredIndex(index)
        setisHovered(true);
    }

    const handleOnMouseLeave = () => {
        setisHovered(false);
    }

    const handleOnClick = () => {
        
    }

    useEffect(() => {
        setComponentTitle('Estudiantes');
        setCanReturn(true);
        setChangeViewFunction(() => handleReturnToPreviousView);
        getData(url);
        setStudentViews(data.map((row) => row.id))
    }, [groupId]); // Agregamos groupId como dependencia del efecto

    return (
        <>
            {isLoading && <div>Cargando...</div>}
            <div className='progress-headers' style={{display: isLoading ? 'none' : 'flex'}} >
                <div className="code-header"><p>Matrícula</p></div>
                <div className="name-header"><p>Nombre</p></div>
            </div>
            {data.map((row, index) => (
                <div
                    key={row.id} 
                    className={`progress-item ${(isHovered && index === hoveredIndex) && 'p-i-selected'}`} 
                    onMouseEnter={() => handleOnMouseEnter(index)} 
                    onMouseLeave={() => handleOnMouseLeave(index)}
                    // onClick={ () => handleOnClick(row.id) }
                >
                    <div className="code-data"><b>{row.id}</b></div>
                    <div className='name-data'>
                        <p>{row.nombre + ' ' + row.apellido1 + ' ' + row.apellido2}</p>
                        <ArrowLeft className={`arrow-left ${(isHovered && index === hoveredIndex) && 'a-l-selected'}`} />
                    </div>
                </div>
            ))}
        </>
    );
};
