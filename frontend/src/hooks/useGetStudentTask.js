import { getPendingTask } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetPendingTask = (student_id) => {
    const [data_pending, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (student_id){
                    const resultado = await getPendingTask(student_id);
                    setProblemData(resultado);
                }
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [student_id]);

    return { data_pending, error };
}