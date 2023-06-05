import React from 'react'
import { useState } from 'react';
import { useDashboardData } from '../../../hooks/useDashboardData';

import { ReactComponent as ArrowLeft } from '../../../assets/svg/icons/arrow-right-solid.svg';

import '../../../styles/professor_dashboard/progress.css';
import { useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;

export const ProgressGroups = ({professorId, setComponentTitle, setCurrentView, setGroupId}) => {
    const [isHovered, setisHovered] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const { data, axiosError, isLoading, getData } = useDashboardData();

    const url = `http://${backendUrl}:${port}/dashboard/profesor/avances?id=${professorId}`;

    useEffect(() => {
        setComponentTitle('Avances')
        getData(url);
    }, [])
    
    const handleOnMouseEnter = (index) => {
        setHoveredIndex(index)
        setisHovered(true);
    }

    const handleOnMouseLeave = () => {
        setisHovered(false);
    }

    const handleOnClick = (idGrupo) => {
        setGroupId(idGrupo);

        setCurrentView(1);
    }

    return (
        <>        
            {isLoading && <div>Cargando...</div>}
            <div className='progress-headers' style={{display: isLoading ? 'none' : 'flex'}} >
                <div className="code-header"><p>Código</p></div>
                <div className="name-header"><p>Nombre</p></div>
            </div>
            {
                data.map((row, index) => (       
                    <div
                        key={row.codigo} 
                        className={`progress-item ${(isHovered && index === hoveredIndex) && 'p-i-selected'}`} 
                        onMouseEnter={() => handleOnMouseEnter(index)} 
                        onMouseLeave={() => handleOnMouseLeave(index)}
                        onClick={ () => handleOnClick(row.id) }
                    >
                        <div className="code-data"><p>{row.codigo}</p></div>
                        <div className='name-data'>
                            <p>{row.nombre}</p>
                            <ArrowLeft className={`arrow-left ${(isHovered && index === hoveredIndex) && 'a-l-selected'}`} />
                        </div>
                    </div>
                ))
            }
        </>
    )
}
