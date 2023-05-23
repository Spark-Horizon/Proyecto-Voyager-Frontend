import { getProgress } from "../helpers/getProgress.js";
import { useState, useEffect } from 'react';

export const useGetProgress = (materia_id) => {
    const [data_progress, setProgressData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (materia_id) {
            const fetchData = async () => {
                try {
                    const path = await getProgress(materia_id);
                    setProgressData(path[0]);
                    console.log("returned path: ", path[0]);
                } catch (error) {
                    setError(error);
                }
            };

            fetchData();
        }

    }, [materia_id]);

    return { data_progress, error };
}