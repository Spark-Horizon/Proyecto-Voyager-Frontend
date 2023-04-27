import { getCodeTask } from "../helpers/indexHelpers.js";
import { useState, useEffect } from 'react';

export const useGetCodeTask = (problem_id) => {
    const [data, setProblemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const archivo = await getCodeTask(problem_id);
                console.log(archivo);
                const { id, author, title, description, topic, difficulty, driver, tests } = archivo;
                setProblemData({ id, author, title, description, topic, difficulty, driver, tests });
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [problem_id]);

    return { data, error };
}