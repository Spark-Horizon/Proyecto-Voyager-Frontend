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
                ? <div>TESTING</div>
                : axiosError !== null
                ? <div>{axiosError}</div>
                : <div>Cargando...</div>
    )
}
