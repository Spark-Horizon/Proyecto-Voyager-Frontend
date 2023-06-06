import { getPendingTask, getActSummaryTask } from "../helpers/indexHelpers.js";
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

export const useGetActSummaryTask = (student_id) => {
    const [data_summary, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (student_id){
                    const resultado = await getActSummaryTask(student_id);
                    setProblemData(resultado);
                }
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [student_id]);

    return { data_summary, error };
}