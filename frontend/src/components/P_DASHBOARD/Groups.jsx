import axios from 'axios';

import { useState, useEffect } from 'react';
import { GroupsItem } from './GroupsItem';
import { PDSHPanelTemplate } from './PDSHPanelTemplate';

import '../../styles/professor_dashboard/groups.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT

export const Groups = ({ professorId }) => {
    const [groupsData, setGroupsData] = useState([]);
    const [axiosError, setAxiosError] = useState(null);

    const getGroupsData = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            const response = await axios.get(`http://${backendUrl}:${port}/dashboard/profesor/entregas?id=${professorId}`, config);

            const {data} = response;

            setGroupsData(data)
        } catch (error) {
            setAxiosError('Problemas con el servidor, intentar más tarde.');
        }
    }

    useEffect(() => {
        getGroupsData();
    }, [])

    return (
        <>
            <PDSHPanelTemplate title={'Grupos'} />       
            {
                groupsData.length !== 0
                ? <div className="groups-main-container">
                    <table className='groups-table'>
                        <thead>
                            <tr className='groups-table-headers'>
                                <th>ID</th>
                                <th>Materia</th>
                                <th>Nombre del curso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                groupsData.map((data) => {
                                    let groupItems = [];

                                    let index = 0;
                                    for (let key in data) {
                                        if (index === 0)
                                            groupItems.push(<GroupsItem key={data['id'] + index} type={'groups-td-first'} data={data[key]} />)
                                        else if (index === groupsData.length - 1)
                                            groupItems.push(<GroupsItem key={data['id'] + index} type={'groups-td-last'} data={data[key]} />)
                                        else if (index !== groupsData.length - 1)
                                            groupItems.push(<GroupsItem key={data['id'] + index} type={'groups-td-middle'} data={data[key]} />)
                                        index++;
                                    }

                                    return <tr key={data['id']} className="groups-table-row">{groupItems}</tr>;
                                })
                            }
                        </tbody>
                    </table>
                </div>
                : axiosError !== null
                ? <div>{axiosError}</div>
                : <div>Cargando...</div>
            } 
            
        </>
    )
}
