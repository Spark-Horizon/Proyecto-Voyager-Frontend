import { getProgress } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetProgress = (subtema_id, task_type) => {
    const [data_progress, setProgressData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (subtema_id) {
            const fetchData = async () => {
                try {
                    const path = await getProgress(subtema_id, task_type);
                    setProgressData(path[0]);
                    console.log("returned path: ", path[0]);
                } catch (error) {
                    setError(error);
                }
            };

            fetchData();
        }

    }, [subtema_id, task_type]);

    return { data_progress, error };
}