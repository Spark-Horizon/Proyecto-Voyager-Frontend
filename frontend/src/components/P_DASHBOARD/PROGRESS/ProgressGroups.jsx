import React from 'react'
import { useState, useEffect } from 'react';

import { PDSHPanelTemplate } from '../PDSHPanelTemplate';
import { ReactComponent as ArrowLeft } from '../../../assets/svg/icons/arrow-right-solid.svg';

import { useDashboardData } from '../../../hooks/useDashboardData';
import { Loading } from '../../Loading';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;


export const ProgressGroups = ({professorId, setGroupId, changeParentView}) => {
    const [isHovered, setisHovered] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const { data, axiosError, isLoading, getData } = useDashboardData();

    useEffect(() => {
        getData(`http://${backendUrl}:${port}/dashboard/profesor/avances?id=${professorId}`);
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

        changeParentView(1);
    }

    return (
        <> 
            <PDSHPanelTemplate title={'Grupos asignados'} />
            {
                isLoading && axiosError === null
                ? <div className='loading'><Loading /></div>
                : axiosError !== null
                ? <div>{axiosError}</div>
                : <div className="progress-main-container">
                <div className='progress-headers' >
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
            </div>
            }
        </>
    )
}
