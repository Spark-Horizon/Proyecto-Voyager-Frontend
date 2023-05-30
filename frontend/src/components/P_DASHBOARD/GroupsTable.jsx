import axios from 'axios';

import { GroupsItem } from './GroupsItem';

import { useState, useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;

export const GroupsTable = ({professorId, changeView}) => {
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
        groupsData.length !== 0
                ? <table className='groups-table'>
                    <thead>
                        <tr className='groups-table-headers'>
                            <th>Código</th>
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
                                        groupItems.push(<GroupsItem key={data['id'] + index} type={'normal'} classType={'groups-td-first'} data={data[key]} />)
                                    else if (index === Object.values(data).length - 1)
                                        groupItems.push(<GroupsItem key={data['id'] + index} changeView={changeView} classType={'groups-td-last'} data={data[key]} />)
                                    else if (index !== Object.values(data).length - 1)
                                        groupItems.push(<GroupsItem key={data['id'] + index} type={'normal'} classType={'groups-td-middle'} data={data[key]} />)
                                    index++;
                                }
        
                                return <tr key={data['id']} className="groups-table-row">{groupItems}</tr>;
                            })
                        }
                    </tbody>
                </table>
                : axiosError !== null
                ? <div>{axiosError}</div>
                : <div>Cargando...</div>
    )
}
