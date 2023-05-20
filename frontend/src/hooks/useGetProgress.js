import { getProgress } from "../helpers/getProgress.js";
import { useState, useEffect } from 'react';

export const useGetProgress = (materia_id) => {
    const [data_progress, setProgressData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const path = await getProgress(materia_id);
                setProgressData(path);
                //console.log(path);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [materia_id]);

    return { data_progress, error };
}