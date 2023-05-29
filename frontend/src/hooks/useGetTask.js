import { getTask } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetTask = (problem_id) => {
    const [data, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const archivo = await getTask(problem_id);
                console.log(archivo);
                setProblemData(archivo);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [problem_id]);

    return { data, error };
}