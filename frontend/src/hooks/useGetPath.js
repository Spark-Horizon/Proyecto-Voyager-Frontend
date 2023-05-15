import { getPath } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetPath = (materia_id) => {
    const [data, setPathData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const path = await getPath(materia_id);
                setPathData(path);
                console.log(path);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [materia_id]);

    return { data, error };
}