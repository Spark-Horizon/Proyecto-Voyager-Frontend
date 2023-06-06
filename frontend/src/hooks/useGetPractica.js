import { getPractica } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetPractica = (subtema_id, task_type) => {
    const [ practica, setPractica ] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (subtema_id) {
            const fetchData = async () => {
                try {
                    const path = await getPractica(subtema_id, task_type);
                    setPractica(path[0]);
                    //console.log("returned path: ", path[0]);
                } catch (error) {
                    console.log("Error >>>", error.response.data.code, error.response.data.code === 23502 ? "" : "No hay ejercicio disponible")
                    setError(error);
                }
            };

            fetchData();
        }

    }, [subtema_id, task_type]);

    return { practica, error };
}